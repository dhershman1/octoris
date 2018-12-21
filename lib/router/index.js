const qs = require('querystring')
const URI = require('uri-js')
const debug = require('debug')('octo:router')
const { first, last, omit, reduce, update } = require('kyanite')

const { tree, searchTree } = require('./tree')
const _curry2 = require('../_internals/_curry2')

/**
 * Combines an array of maps into a single map value
 * @function
 * @private
 * @param {Array} arr An array of maps to flatten and combine
 * @returns {Map} A new map of all the given array values
 */
function flattenMap (arr) {
  return arr.reduce((acc, v) => acc ? new Map([...acc, ...v]) : v, null)
}

/**
 * Converts an array of functions into a Map
 * @function
 * @private
 * @param {Array} arr An array of functions
 * @returns {Map} A new Map of the provided functions
 */
function convertToMap (arr) {
  return new Map(arr.map(x => [x.name, x]))
}

/**
 * This function handles middleware for a particular route method
 * @function
 * @public
 * @param {Function} fn The middleware function
 * @returns {Function} A new function with the middleware wrapper
 */
function use (fn) {

}

/**
 * Takes an array of maps to attach them to the root map as branches
 * @function
 * @public
 * @param {Map} root The root Branch
 * @param {Array} routes An array of Maps to attach to the root branch
 * @returns {Map} A new concated map object
 */
function concatRoutes (root, routes) {
  const flatMap = flattenMap(routes)
  const resMap = new Map(...root)
  const rootPath = first(Array.from(resMap.keys()))

  flatMap.forEach((val, key) => {
    resMap.get(rootPath).set(key, val)
  })

  return resMap
}

/**
 * This will generate a route listener that will be used later on
 * @function
 * @public
 * @param {Array} path An array of path functions to build out a route
 * @param {Array} methods The array of http Methods to use
 * @returns {Array} A key value array for the path and map of handlers
 */
function route (paths, methods) {
  if (methods) {
    debug('Methods', convertToMap(methods))

    const routes = update(paths.length - 1, new Map([...last(paths), ['methods', convertToMap(methods)]]), paths)
    const res = reduce(tree, new Map(), routes)

    debug('Finished Tree: %o', res)
    return res
  }

  return function initRoute (_methods) {
    return route(paths, _methods)
  }
}

// Now how to tackle these...
// How should they be stored in the map?

// Same as :id or :id?
// Should convert the value to regex?
/**
 * Specifies a string to be a param of a route path
 * @function
 * @public
 * @param {String} p The path to look for
 * @returns {Map} The Map for this path piece
 */
function param (p) {
  return new Map([['name', p], ['type', 'param']])
}

/**
 * Converts a string to a static path value of a route
 * @function
 * @public
 * @param {String} uri The path or static string to use
 * @returns {Map} The Map for this path piece
 */
function fixed (uri) {
  return new Map([['name', uri], ['type', 'static']])
}

/**
 * Takes an Array of routes and builds a single handler from them
 * @function
 * @public
 * @param {Array} routes The array of key value arrays for routes
 * @returns {Function} A function to give to the http server
 */
function routeReducer (routes) {
  const routeMap = flattenMap(routes)

  return function (request, response) {
    debug('URI Parse', URI.parse(request.url))
    const { path, query, fragment } = URI.parse(request.url)
    const foundMap = searchTree(routeMap, path)

    if (foundMap) {
      debug('Found %o', foundMap)
      // Time to play the game of:
      // Are Those Really Required!
      // Starting with our context object here what do we really need?
      const ctx = {
        request,
        response,
        params: foundMap.get('params') || {},
        fullPath: request.url,
        search: query,
        pathname: path,
        hash: fragment || '',
        query: qs.parse(query),
        urlSearchParams: new URLSearchParams(query)
      }
      const method = foundMap.get('methods').get(request.method)

      debug('Context', omit(['request', 'response'], ctx))
      debug('Found Listener %o', method)

      return method(ctx)(ctx)
    }
  }
}

module.exports = {
  concatRoutes: _curry2(concatRoutes),
  param,
  route,
  routeReducer,
  fixed,
  use
}
