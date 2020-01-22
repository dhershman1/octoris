const { get, findInMap } = require('../utils')
const { always, both, branch, compose, eq, identity, last, pipe, reduce, type, when } = require('kyanite')

/**
 * Sets a found parameter to a route map before sending it to the handlers
 * @function
 * @private
 * @param {Any} val The value to set in our route map
 * @param {Map} map The Route map to crawl through
 * @returns {Map} A new map with the found parameters and handlers
 */
function setParam (val, map) {
  return function ([key, value]) {
    if (!map) {
      return value.set('params', { [key]: val })
    }

    return value.set('params', { ...get('params', map), [key]: val })
  }
}

/**
 * Searchs the map for a matching parameter
 * @function
 * @private
 * @param {Map} map The map to crawl through
 * @param {String} paramVal The value to assign our param once it's found
 * @returns {Map} A new map with the set parameters
 */
function matchParam (map, paramVal) {
  return pipe([
    findInMap(
      compose(
        both(compose(eq('Map'), type), compose(eq('param'), get('type'))),
        last
      )
    ),
    when(identity, branch(
      always(map.has('params')),
      setParam(paramVal, map),
      setParam(paramVal)
    ))
  ], map)
}

/**
 * Builds out a radix tree for route handling
 * @function
 * @public
 * @param {Map} route The current route in the chain
 * @param {Map} currTree The current tree
 * @returns {Map} A new map of the built out Route Radix Tree
 */
function tree (route, currTree) {
  // If the size is 0 or the size is 2 then we have either a base, or a static branch
  if (!currTree.size || currTree.size === 2) {
    return currTree.set(route.get('name'), route)
  }

  // If the size is 1 then grab the first key, otherwise grab the 3rd key to move onto the next branch
  const key = currTree.size === 1 ? Array.from(currTree.keys())[0] : Array.from(currTree.keys())[2]

  return currTree.set(key, tree(route, currTree.get(key)))
}

/**
 * Searches the Radix Tree map for the matching handlers on the route path
 * @function
 * @public
 * @param {Map} tree The map to crawl through
 * @param {String} url The route path to crawl with
 * @returns {Map} The found map object to use for the route handling
 */
function searchTree (treeMap, url) {
  const [, ...crawlPath] = url.split('/')

  // This is so we can properly handle root level routes
  if (url === '/') {
    crawlPath[0] = '/'
  }

  const endOfCrawl = last(crawlPath)
  const foundMap = reduce((val, acc) => {
    // It is a static path
    // Also check if we are at the end of our crawl, and that the current map has methods to use
    if (acc.has(val) || (val === endOfCrawl && acc.has('methods'))) {
      return acc.get(val)
    }

    const res = matchParam(acc, val)

    // It's a param
    return res
  }, treeMap, crawlPath) || new Map()

  return foundMap.has('methods') ? foundMap : treeMap.get('all')
}

module.exports = {
  tree,
  searchTree
}
