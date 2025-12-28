export class Response {
  constructor(nodeRes) {
    this.original = nodeRes;
    this.headersSent = false;
    this.statusCode = 200;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(data) {
    const jsonString = JSON.stringify(data);
    this.original.writeHead(this.statusCode, {
      'Content-Type': 'application/json'
    });
    this.original.end(jsonString);
    this.headersSent = true;
    return this;
  }
}