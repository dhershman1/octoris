const debug = require('debug')('octo:router')
const { first, last, map, reduce, update } = require('kyanite')
const { tree, searchTree } = require('./tree')
const _curry2 = require('../_internals/_curry2')

function flattenMap (arr) {
  return arr.reduce((acc, v) => acc ? new Map([...acc, ...v]) : v, null)
}

// All of the below is subject for rewrite and changes

function pipeRoutes (routes) {

}

function concatRoutes (root, routes) {
  const iterMap = flattenMap(routes)
  const resMap = new Map(...root)
  const rootPath = first(Array.from(resMap.keys()))

  iterMap.forEach((val, key) => {
    resMap.get(rootPath).set(key, val)
  })

  return resMap
}

/**
 * Converts an array of functions into a Map
 * @private
 * @function
 * @param {Array} arr An array of functions
 * @return {Map} A new Map of the provided functions
 */
function convertToMap (arr) {
  return new Map(arr.map(x => [x.name, x()]))
}

/**
 * This will generate a route listener that will be used later on
 * @function
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
function param (p) {
  return new Map([['name', `:${p}`], ['type', 'param'], ['optional', p.includes('?')]])
}

// Same as place
function static (uri) {
  return new Map([['name', uri], ['type', 'static'], ['optional', false]])
}

/**
 * Takes an Array of routes and builds a single handler from them
 * @function
 * @param {Array} routes The array of key value arrays for routes
 * @returns {Function} A function to give to the http server
 */
function routeReducer (routes) {
  const routeMap = flattenMap(routes)
  debug('Reducer routes %o', routeMap)

  return function (request, response) {
    const ctx = { request, response }
    // const handler = routes.get(request.url)
    const handler = searchTree(routeMap, request.url)

    debug('Found handler', handler)
    if (handler) {
      const method = handler.get(request.method)
      debug('Found Listener %o', method)

      return method(ctx)(ctx)
    }
  }
}

module.exports = {
  concatRoutes: _curry2(concatRoutes),
  route,
  param,
  static,
  routeReducer
}
