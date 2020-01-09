const qs = require('querystring')
const logger = require('pino')
const URI = require('uri-js')
const { first, last, reduce, type, update, pipeP } = require('kyanite')
const { tree, searchTree } = require('./tree')
const { mergeMaps } = require('../utils')
const _curry2 = require('../_internals/_curry2')
const _curryOpt = require('../_internals/_curryOpt')

/**
 * Takes an array of maps to attach them to the root map as branches
 * TODO: This could for sure be improved for both performance, and readability
 * @function
 * @public
 * @param {Map[]} root The root Branch
 * @param {Array} routes An array of Maps to attach to the root branch
 * @returns {Map} A new concated map object
 */
function concatRoutes (root, routes) {
  const flatMap = mergeMaps(routes)
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
 * A function that creates a catch all route as a fallback for routes not being found Note, you can only set ONE catch all route
 * @function
 * @public
 * @returns {Map} A catch all map piece
 */
function all () {
  return new Map([['name', 'all'], ['type', 'catch-all']])
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
 * Handles running middleware for the route and method stages, as well as the route response
 * @function
 * @private
 * @param {Object} ctx The route context
 * @param {Map} routeMap The Route Map Tree we are looking through
 * @returns {Promise}
 */
function handleRoute (ctx, routeMap) {
  const routeMw = routeMap.get('middleware')
  const { fn, middleware = [] } = routeMap.get('methods').get(ctx.request.method)

  return pipeP(routeMw, ctx)
    .then(pipeP(middleware))
    .then(finalCtx => fn(finalCtx).then(res => res(finalCtx)))
}

function composeRoutes (opts, routes, mw = []) {
  const routeMap = mergeMaps(routes)
  const extra = { logger: useLogger(opts.logger) }

  routeMap.set('middleware', mw)

  return function (request, response) {
    const { path, query, fragment = '' } = URI.parse(request.url)
    const globalMiddleware = routeMap.get('middleware')
    const ctx = {
      request,
      response: Object.assign(response, { headers: {} }, { setHeaders: setHeaders(response) }),
      fullPath: request.url,
      search: query,
      pathName: path,
      hash: fragment,
      query: qs.parse(query),
      urlSearchParams: new URLSearchParams(query),
      ...extra
    }
    return pipeP(globalMiddleware, ctx)
      .then(globalCtx => {
        if (globalCtx.response.finished) {
          return
        }

        const foundMap = searchTree(routeMap, path)

        if (foundMap) {
          globalCtx.params = foundMap.get('params') || {}

          return handleRoute(globalCtx, foundMap)
        }

        response.writeHead(404, { 'Content-Type': 'text/html' })

        return response.end(`Unable to find ${request.url}`)
      })
      .catch(err => {
        ctx.logger.error(err)
        response.writeHead(500)
        response.end('Something borked Jim!')
      })
  }
}

module.exports = {
  composeRoutes: _curryOpt(composeRoutes),
  concatRoutes: _curry2(concatRoutes),
  route,
  fixed,
  param,
  all
}
