const _curry2 = require('../_internals/_curry2')
const debug = require('debug')('octoris:router')

// All of the below is subject for rewrite and changes

/**
 * This will generate a route listener that will be used later on
 * @function
 * @param {Array} path An array of path functions to build out a route
 * @param {Array} methods The array of http Methods to use
 * @returns {Array} A key value array for the path and map of handlers
 */
function route (path, methods) {
  // We can add extras here if need be that can be passed to fn()
  const routeMap = new Map(methods.map(fn => [fn.name, fn]))

  debug('Created new Route %o', [path, routeMap])
  return [path, routeMap]
}

// Now how to tackle these...
// How should they be stored in the map?

// Same as :id?
// Should convert the value to regex?
function maybeParam (p) {

}

// Same as :id
// Should convert the value to regex?
function param (p) {

}

// Same as /place
function static (uri) {

}

/**
 * Takes an Array of routes and builds a single handler from them
 * @function
 * @param {Array} routes The array of key value arrays for routes
 * @returns {Function} A function to give to the http server
 */
function routeReducer (routes) {
  const routeMap = new Map(routes)

  return function (request, response) {
    const ctx = { request, response }
    const handler = routeMap.get(request.url)

    if (handler) {
      const method = handler.get(request.method)
      debug('Found Url', handler)
      debug('Found Listener %o', method)

      return method(ctx)(ctx)
    }
  }
}

module.exports = {
  route: _curry2(route),
  param,
  maybeParam,
  static,
  routeReducer
}
