/**
 * A handler that sets up a map for the CONNECT type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
function CONNECT (handler, middleware = []) {
  return new Map([['CONNECT', { fn: handler, middleware }]])
}

/**
 * A handler that sets up a map for the DELETE type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
function DELETE (handler, middleware = []) {
  return new Map([['DELETE', { fn: handler, middleware }]])
}

/**
 * A handler that sets up a map for the GET type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
function GET (handler, middleware = []) {
  return new Map([['GET', { fn: handler, middleware }]])
}

/**
 * A handler that sets up a map for the HEAD type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
function HEAD (handler, middleware = []) {
  return new Map([['HEAD', { fn: handler, middleware }]])
}

/**
 * A handler that sets up a map for the OPTIONS type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
function OPTIONS (handler, middleware = []) {
  return new Map([['OPTIONS', { fn: handler, middleware }]])
}

/**
 * A handler that sets up a map for the PATCH type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
function PATCH (handler, middleware = []) {
  return new Map([['PATCH', { fn: handler, middleware }]])
}

/**
 * A handler that sets up a map for the POST type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
function POST (handler, middleware = []) {
  return new Map([['POST', { fn: handler, middleware }]])
}

/**
 * A handler that sets up a map for the PUT type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
function PUT (handler, middleware = []) {
  return new Map([['PUT', { fn: handler, middleware }]])
}

/**
 * A handler that sets up a map for the TRACE type
 * @public
 * @function
 * @param {Function} handler The handle function for this method
 * @param {Function[]} middleware The list of middleware functions to use
 * @returns {Map} The built map for our radix tree
 */
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
