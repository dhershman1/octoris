const debug = require('debug')('octo:tree')
const { get, set, always, both, branch, compose, eq, nth, type } = require('../utils')

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

function matchParam (map, paramVal) {
  for (let [key, value] of map.entries()) {
    if (both(compose(eq('Map'), type), get('type'), value)) {
      return branch(
        always(map.has('params')),
        set('params', { ...map.get('params'), [key]: paramVal }),
        set('params', { [key]: paramVal }),
        value
      )
    }
  }

  return map
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
