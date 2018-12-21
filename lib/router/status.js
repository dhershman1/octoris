/**
 * I am unsure with where I want this to go right now
 * I plan on using it in the near future however
 */

const httpStatuses = {
  OK: Symbol('ok'), // 200
  NotFound: Symbol('not found'), // 404
  Internal: Symbol('internal error'), // 500
  BadRequest: Symbol('bad request'), // 400
  BadGateway: Symbol('bad gateway'), // 502
  GatewayTimeout: Symbol('gateway timeout'), // 504
  RequestTimeout: Symbol('request timeout'), // 408
  Unauthorized: Symbol('unauthorized'), // 401
  Forbidden: Symbol('forbidden') // 403
}

module.exports = httpStatuses
