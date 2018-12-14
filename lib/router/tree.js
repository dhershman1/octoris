const debug = require('debug')('octo:tree')
const { mapFind, get, always, both, branch, compose, eq, last, nth, pipe, type } = require('../utils')

/**
 * Builds out a radix tree for route handling
 * @private
 * @function
 * @param {Array} routes An array of route objects
 * @param {Map} tree The current tree
 */
function tree (route, currTree) {
  debug('building route tree %o', currTree)

  if (!currTree.size || currTree.size === 2) {
    return new Map([...currTree, [route.get('name'), route]])
  }

  const key = currTree.size === 1 ? Array.from(currTree.keys())[0] : Array.from(currTree.keys())[2]

  return new Map([...currTree, [key, tree(route, currTree.get(key))]])
}

// This should be approachable, problem with branch or whatever
// Sets not working, etc.
function setParam (val, map) {
  return function ([key, value]) {
    if (!map) {
      return new Map([...value, ['params', { [key]: val }]])
    }

    return new Map([...value, ['params', { ...map.get('params'), [key]: val }]])
  }
}

function matchParam (map, paramVal) {
  debug('matchParam %o', map)
  return pipe([
    mapFind(compose(both(compose(eq('Map'), type), get('type')), last)),
    branch(
      always(map.has('params')),
      setParam(paramVal, map),
      setParam(paramVal)
    )
  ], map)
}

function searchTree (tree, url) {
  debug('Tree %o', tree)
  const [, ...crawlPath] = url.split('/')

  debug('crawl:', crawlPath)

  return crawlPath.reduce((acc, val, i) => {
    // It is a static path
    if (acc.has(val)) {
      return acc.get(val)
    }

    // It's a param
    return matchParam(acc, nth(i, crawlPath))
  }, tree)
}

module.exports = {
  tree,
  searchTree
}
