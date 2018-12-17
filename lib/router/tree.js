const debug = require('debug')('octo:tree')
const { mapFind, get, always, both, branch, compose, eq, last, pipe, type } = require('../utils')

/**
 * Builds out a radix tree for route handling
 * @private
 * @function
 * @param {Array} routes An array of route objects
 * @param {Map} tree The current tree
 * @returns {Map} A new map of the built out Route Radix Tree
 */
function tree (route, currTree) {
  if (!currTree.size || currTree.size === 2) {
    return new Map([...currTree, [route.get('name'), route]])
  }

  const key = currTree.size === 1 ? Array.from(currTree.keys())[0] : Array.from(currTree.keys())[2]

  return new Map([...currTree, [key, tree(route, currTree.get(key))]])
}

/**
 * Sets a found parameter to a route map before sending it to the handlers
 * @private
 * @function
 * @param {Any} val The value to set in our route map
 * @param {Map} map The Route map to crawl through
 * @returns {Map} A new map with the found parameters and handlers
 */
function setParam (val, map) {
  return function ([key, value]) {
    if (!map) {
      return new Map([...value, ['params', { [key]: val }]])
    }

    return new Map([...value, ['params', { ...map.get('params'), [key]: val }]])
  }
}

/**
 * Searchs the map for a matching parameter
 * @private
 * @function
 * @param {Map} map The map to crawl through
 * @param {String} paramVal The value to assign our param once it's found
 * @returns {Map} A new map with the set parameters
 */
function matchParam (map, paramVal) {
  return pipe([
    mapFind(compose(both(compose(eq('Map'), type), get('type')), last)),
    branch(
      always(map.has('params')),
      setParam(paramVal, map),
      setParam(paramVal)
    )
  ], map)
}

/**
 * Searches the Radix Tree map for the matching handlers on the route path
 * @public
 * @function
 * @param {Map} tree The map to crawl through
 * @param {String} url The route path to crawl with
 * @returns {Map} The found map object to use for the route handling
 */
function searchTree (tree, url) {
  const [, ...crawlPath] = url.split('/')

  debug('crawl:', crawlPath)

  return crawlPath.reduce((acc, val, i) => {
    // It is a static path
    if (acc.has(val)) {
      return acc.get(val)
    }

    // It's a param
    return matchParam(acc, val)
  }, tree)
}

module.exports = {
  tree,
  searchTree
}
