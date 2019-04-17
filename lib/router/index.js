const { first, last, reduce, type, update } = require('kyanite')
const { tree, searchTree } = require('./tree')

function route (routePath, methods) {
  const compressedMethods = reduce((m, acc) => {
    return new Map([...acc, ...m])
  }, new Map(), methods)

  return reduce(
    tree,
    new Map(),
    update(routePath.length - 1, new Map([...last(routePath), ['methods', compressedMethods]]), routePath)
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

module.exports = {
  route,
  fixed,
  param
}
