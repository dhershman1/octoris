/**
 * I am unsure with where I want this to go right now
 * I plan on using it in the near future however
 */

/**
 * @constant
 */
const httpStatuses = {
  Continue: Symbol('continue'), // 100
  SwitchingProtocols: Symbol('switching protocols'), // 101
  Processing: Symbol('processing'), // 102
  EarlyHints: Symbol('early hints'), // 103
  OK: Symbol('ok'), // 200
  BadRequest: Symbol('bad request'), // 400
  Unauthorized: Symbol('unauthorized'), // 401
  Forbidden: Symbol('forbidden'), // 403
  NotFound: Symbol('not found'), // 404
  RequestTimeout: Symbol('request timeout'), // 408
  Internal: Symbol('internal error'), // 500
  BadGateway: Symbol('bad gateway'), // 502
  GatewayTimeout: Symbol('gateway timeout') // 504
}

module.exports = httpStatuses
