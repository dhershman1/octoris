function CONNECT (handler) {
  return new Map([['CONNECT', handler]])
}

function DELETE (handler) {
  return new Map([['DELETE', handler]])
}

function GET (handler) {
  return new Map([['GET', handler]])
}

function HEAD (handler) {
  return new Map([['HEAD', handler]])
}

function OPTIONS (handler) {
  return new Map([['OPTIONS', handler]])
}

function PATCH (handler) {
  return new Map([['PATCH', handler]])
}

function POST (handler) {
  return new Map([['POST', handler]])
}

function PUT (handler) {
  return new Map([['PUT', handler]])
}

function TRACE (handler) {
  return new Map([['TRACE', handler]])
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
