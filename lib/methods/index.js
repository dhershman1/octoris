function CONNECT (handler, middleware = []) {
  return new Map([['CONNECT', { fn: handler, middleware }]])
}

function DELETE (handler, middleware = []) {
  return new Map([['DELETE', { fn: handler, middleware }]])
}

function GET (handler, middleware = []) {
  return new Map([['GET', { fn: handler, middleware }]])
}

function HEAD (handler, middleware = []) {
  return new Map([['HEAD', { fn: handler, middleware }]])
}

function OPTIONS (handler, middleware = []) {
  return new Map([['OPTIONS', { fn: handler, middleware }]])
}

function PATCH (handler, middleware = []) {
  return new Map([['PATCH', { fn: handler, middleware }]])
}

function POST (handler, middleware = []) {
  return new Map([['POST', { fn: handler, middleware }]])
}

function PUT (handler, middleware = []) {
  return new Map([['PUT', { fn: handler, middleware }]])
}

function TRACE (handler, middleware = []) {
  return new Map([['TRACE', { fn: handler, middleware }]])
}

module.exports = {
  CONNECT,
  DELETE,
  GET,
  HEAD,
  OPTIONS,
  PATCH,
  POST,
  PUT,
  TRACE
}
