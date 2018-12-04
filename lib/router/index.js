const _curry2 = require('../_internals/_curry2')
const { updateRoutes } = require('../_internals/context')
const debug = require('debug')('octoris:router')

// All of the below is subject for rewrite and changes

/**
 * This will generate a route listener that will be used later on
 * @function
 * @param {String} path The path string to listen too
 * @param {Array} methods The array of http Methods to use
 * @returns {Array} A key value array for the path and map of handlers
 */
function route (path, methods) {
  // We can add extras here if need be that can be passed to fn()
  const routeMap = new Map(methods.map(fn => [fn.name, fn()]))

  debug('Created new Route %o', [path, routeMap])
  return [path, routeMap]
}

/**
 * This will probably see change, but it just takes the provided info generates a new symbol and saves that to our internal state of octoris for later use
 * @function
 * @param {String} path The path string to listen too
 * @param {Array} methods An array http method types to use
 * @returns {Array} A normal key value array for later use
 */
function dynamicRoute (path, methods) {
  // const sym = Symbol(path)

  // This function will add the dynamic route
  // Onto the internal state of octoris
  updateRoutes(path)

  // Register the route as normal afterwards
  return route(path, methods)
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
  dynamicRoute: _curry2(dynamicRoute),
  routeReducer
}
