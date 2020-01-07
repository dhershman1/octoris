const qs = require('querystring')
const logger = require('pino')
const URI = require('uri-js')
const { first, last, reduce, type, update } = require('kyanite')
const { tree, searchTree } = require('./tree')
const { flattenMap } = require('../utils')
const _curry2 = require('../_internals/_curry2')

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
 * @returns {Map} A new structured map
 */
function route (routePath, methods, middleware = []) {
  const compressedMethods = reduce((m, acc) => {
    return new Map([...acc, ...m])
  }, new Map(), methods)

  return reduce(
    tree,
    new Map(),
    update(routePath.length - 1, new Map([...last(routePath), ['methods', compressedMethods], ['middleware', middleware]]), routePath)
  )
}

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
 * Determines if the logger should be enabled or not
 * @function
 * @private
 * @param {Object} details Options for pino to use
 * @returns {Object} The logger object
 */
function useLogger (details) {
  if (!details) {
    return {}
  }

  if (type(details) !== 'Object') {
    return logger({ name: 'octoris' })
  }
}

/**
 * Gives back a function that can be used to set headers onto the response object
 * @param {Object} response The app response object
 * @returns {Function} A function used from response to set headers
 */
function setHeaders (response) {
  return headers => {
    response.headers = headers
  }
}

/**
 * Runs the internal middleware provided to it
 * @private
 * @param {Object} ctx The context object of the app
 * @param {Array} middleware An array of middleware functions
 * @returns {Object} A new context object
 */
function runMiddleware (ctx, middleware) {
  return reduce((mFn, acc) => mFn(acc), ctx, middleware)
}

function composeRoutes (opts, routes, mw = []) {
  const routeMap = flattenMap(routes)
  const extra = { logger: useLogger(opts.logger) }

  routeMap.set('middleware', mw)

  return function (request, response) {
    const { path, query, fragment } = URI.parse(request.url)
    const foundMap = searchTree(routeMap, path)
    const oRes = Object.assign({ headers: {} }, response)
    const oReq = Object.assign({}, request)
    const globalMiddleware = routeMap.get('middleware')

    if (foundMap) {
      const ctx = Object.assign({
        request: oReq,
        response: Object.assign(oRes, { setHeaders: setHeaders(oRes) }),
        node: {
          request,
          response
        },
        params: foundMap.get('params') || {},
        fullPath: request.url,
        search: query,
        pathName: path,
        hash: fragment || '',
        query: qs.parse(query),
        urlSearchParams: new URLSearchParams(query)
      }, extra)

      const routeMiddleware = foundMap.get('middleware') || []
      const { fn, middleware = [] } = foundMap.get('methods').get(request.method)
      const globalCtx = runMiddleware(ctx, globalMiddleware)
      const routeCtx = runMiddleware(globalCtx, routeMiddleware)
      const finalCtx = runMiddleware(routeCtx, middleware)

      return fn(finalCtx)
        .then(res => res(finalCtx))
    }

    response.writeHead(404, { 'Content-Type': 'text/html' })

    return response.end(`Unable to find ${request.url}`)
  }
}

module.exports = {
  composeRoutes: _curry2(composeRoutes),
  concatRoutes: _curry2(concatRoutes),
  route,
  fixed,
  param
}
