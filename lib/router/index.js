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
  debug('Creating route with %o', { path, methods })
  const sym = typeof path === 'symbol' ? path : Symbol(path)
  // We can add extras here if need be that can be passed to fn()
  const routeMap = new Map(methods.map(fn => [Symbol(fn.name), fn()]))

  debug('Created new Route %o', [sym, routeMap])
  return [sym, routeMap]
}

/**
 * This will probably see change, but it just takes the provided info generates a new symbol and saves that to our internal state of octoris for later use
 * @function
 * @param {String} path The path string to listen too
 * @param {Array} methods An array http method types to use
 * @returns {Array} A normal key value array for later use
 */
function dynamicRoute (path, methods) {
  const sym = Symbol(path)

  // This function will add the dynamic route
  // Onto the internal state of octoris
  updateRoutes(sym)

  // Register the route as normal afterwards
  return route(sym, methods)
}

/**
 * Takes the array of routes key value arrays and builds them into a map
 * @function
 * @param {Array} routes The array of key value arrays for routes
 * @returns {Map} A new Map of routes
 */
function routeReducer (routes) {
  return new Map(routes)
}

module.exports = {
  route: _curry2(route),
  dynamicRoute: _curry2(dynamicRoute),
  routeReducer
}
