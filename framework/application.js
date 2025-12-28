import http from 'http';
import { EventEmitter } from 'events';
import { parse } from 'url';

export class Application extends EventEmitter {
  constructor() {
    super();
    this.middlewares = [];
    this.routes = {
      GET: [], POST: [], PUT: [], PATCH: [], DELETE: []
    };
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  get(path, handler) {
    this.routes.GET.push({ path, handler });
    return this;
  }

  post(path, handler) {
    this.routes.POST.push({ path, handler });
    return this;
  }

  put(path, handler) {
    this.routes.PUT.push({ path, handler });
    return this;
  }

  patch(path, handler) {
    this.routes.PATCH.push({ path, handler });
    return this;
  }

  delete(path, handler) {
    this.routes.DELETE.push({ path, handler });
    return this;
  }

  listen(port, callback) {
    const server = http.createServer(this.handleRequest.bind(this));

    server.listen(port, () => {
      if (callback) callback();
      console.log(`🚀 L910 Framework запущен на порту ${port}`);
    });

    return server;
  }

  async handleRequest(req, res) {
    const request = this.createRequest(req);
    const response = this.createResponse(res);

    try {
      if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
        await this.parseBody(request);
      }

      await this.executeMiddlewares(request, response);

      const route = this.findRoute(request.method, request.pathname);
      
      if (route) {
        request.params = route.params;
        await route.handler(request, response);
      } else {
        response.status(404).json({ error: 'Route not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      if (!response.headersSent) {
        response.status(500).json({ 
          error: 'Internal server error',
          message: error.message 
        });
      }
    }
  }

  createRequest(nodeReq) {
    const parsedUrl = parse(nodeReq.url, true);
    
    return {
      original: nodeReq,
      method: nodeReq.method,
      url: nodeReq.url,
      headers: nodeReq.headers,
      pathname: parsedUrl.pathname,
      query: parsedUrl.query,
      body: {},
      params: {}
    };
  }

  createResponse(nodeRes) {
    return {
      original: nodeRes,
      headersSent: false,
      statusCode: 200,
      
      status(code) {
        this.statusCode = code;
        return this;
      },
      
      setHeader(name, value) {
        this.original.setHeader(name, value);
        return this;
      },
      
      send(data) {
        if (this.headersSent) return this;
        
        let body, contentType;
        if (typeof data === 'object' && data !== null) {
          body = JSON.stringify(data);
          contentType = 'application/json';
        } else {
          body = String(data);
          contentType = 'text/plain';
        }
        
        this.original.writeHead(this.statusCode, {
          'Content-Type': contentType,
          'X-Powered-By': 'L910-Framework'
        });
        
        this.original.end(body);
        this.headersSent = true;
        return this;
      },
      
      json(data) {
        return this.setHeader('Content-Type', 'application/json').send(data);
      }
    };
  }

  async executeMiddlewares(req, res) {
    const execute = async (index) => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index];
        await middleware(req, res, () => execute(index + 1));
      }
    };
    
    await execute(0);
  }

  findRoute(method, pathname) {
    const routes = this.routes[method] || [];
    
    for (const route of routes) {
      const params = this.extractParams(route.path, pathname);
      if (params !== null) {
        return { handler: route.handler, params };
      }
    }
    
    return null;
  }

  extractParams(routePath, actualPath) {
    const routeParts = routePath.split('/');
    const actualParts = actualPath.split('/');
    
    if (routeParts.length !== actualParts.length) return null;
    
    const params = {};
    
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].substring(1);
        params[paramName] = actualParts[i];
      } else if (routeParts[i] !== actualParts[i]) {
        return null;
      }
    }
    
    return params;
  }

  parseBody(request) {
    return new Promise((resolve, reject) => {
      let data = '';
      
      request.original.on('data', chunk => {
        data += chunk.toString();
      });
      
      request.original.on('end', () => {
        try {
          if (data) {
            request.body = JSON.parse(data);
          }
          resolve();
        } catch (error) {
          reject(new Error('Invalid JSON in request body'));
        }
      });
      
      request.original.on('error', reject);
    });
  }
}