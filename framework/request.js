export class Request {
  constructor(nodeReq) {
    this.original = nodeReq;
    this.method = nodeReq.method;
    this.url = nodeReq.url;
    this.headers = nodeReq.headers;
    this.body = {};
    this.params = {};
    this.query = {};
  }
}