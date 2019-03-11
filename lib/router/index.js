const qs = require('querystring')
const URI = require('uri-js')
const logger = require('pino')
const { first, last, reduce, type, update } = require('kyanite')

const { tree, searchTree } = require('./tree')
const { flattenMap } = require('../utils')
const _curry2 = require('../_internals/_curry2')

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
 * Takes an array of maps to attach them to the root map as branches
 * TODO: This could for sure be improved for both performance, and readability
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
  return reduce(
    tree,
    new Map(),
    update(paths.length - 1, new Map([...last(paths), ['methods', convertToMap(methods)]]), paths)
  )
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

function useLogger (details) {
  if (!details) {
    return {}
  }

  if (type(details) !== 'Object') {
    return logger({ name: 'octoris' })
  }

  return logger(details)
}

/**
 * Takes an Array of routes and builds a single handler from them
 * @function
 * @public
 * @param {Array} routes The array of key value arrays for routes
 * @returns {Function} A function to give to the http server
 */
function composeRoutes (opts, routes) {
  const routeMap = flattenMap(routes)
  const extra = { logger: useLogger(opts.logger) }

  return function (request, response) {
    const { path, query, fragment } = URI.parse(request.url)
    const foundMap = searchTree(routeMap, path)

    if (foundMap) {
      // Time to play the game of:
      // Are Those Really Required!
      // Starting with our context object here what do we really need?
      const defaultCtx = {
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
      const ctx = Object.assign({}, defaultCtx, extra)
      const method = foundMap.get('methods').get(request.method)

      return method(ctx)(ctx)
    }
    response.writeHead(404, { 'Content-Type': 'text/html' })

    return response.end(`Unable to find ${request.url}`)
  }
}

module.exports = {
  concatRoutes: _curry2(concatRoutes),
  route: _curry2(route),
  param,
  composeRoutes,
  fixed
}
