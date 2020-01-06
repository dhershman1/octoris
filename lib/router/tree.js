const { get, mapFind } = require('../utils')
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
    mapFind(
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
 * Map {
 *   name => home,
 *   type => static,
 *   methods => Map {
 *      GET => { fn: handler, middleware: [fn1, fn2] }
 *   }
 * }
 */

/**
 * Builds out a radix tree for route handling
 * @function
 * @public
 * @param {Array} routes An array of route objects
 * @param {Map} tree The current tree
 * @returns {Map} A new map of the built out Route Radix Tree
 */
function tree (route, currTree) {
  console.log('Current Tree', currTree)
  if (!currTree.size || currTree.size === 2) {
    return currTree.set(route.get('name'), route)
  }

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

  return reduce((val, acc) => {
    // It is a static path
    if (acc.has(val)) {
      return acc.get(val)
    }

    const res = matchParam(acc, val)

    // It's a param
    return res
  }, treeMap, crawlPath)
}

module.exports = {
  tree,
  searchTree
}
