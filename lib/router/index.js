const debug = require('debug')('octo:router')
const { first, last, map, reduce, update } = require('kyanite')
const { tree } = require('./tree')
const _curry2 = require('../_internals/_curry2')

// All of the below is subject for rewrite and changes

function pipeRoutes (routes) {

}

function concatRoutes (root, routes) {
  if (!routes) {

  }
}

/**
 * This will generate a route listener that will be used later on
 * @function
 * @param {Array} path An array of path functions to build out a route
 * @param {Array} methods The array of http Methods to use
 * @returns {Array} A key value array for the path and map of handlers
 */
function route (paths) {
  if (first(paths).get('type') === 'param') {
    throw new Error('A Route must start with a static value')
  }

  return function initRoute (methods) {
    const routes = update(paths.length - 1, new Map([...last(paths), ['methods', methods]]), paths)
    const res = reduce(tree, new Map(), routes)

    debug('Finished Tree: %O', res)
    return res
  }
}

// Now how to tackle these...
// How should they be stored in the map?

// Same as :id?
// Should convert the value to regex?
function maybeParam (p) {
  return {
    name: p,
    type: 'param',
    optional: true
  }
}

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
  concatRoutes: _curry2(concatRoutes),
  route,
  param,
  maybeParam,
  static,
  routeReducer
}
