const debug = require('debug')('octo:tree')

/**
 * Builds out a radix tree for route handling
 * @param {Array} routes An array of route objects
 * @param {Map} tree The current tree
 */
function tree (route, currTree) {
  debug('building route tree %o', currTree)

  if (!currTree.size || currTree.size === 3) {
    return new Map([...currTree, [route.get('name'), route]])
  }

  const key = currTree.size === 1 ? Array.from(currTree.keys())[0] : Array.from(currTree.keys())[3]

  return new Map([...currTree, [key, tree(route, currTree.get(key))]])
}


function searchTree (route) {

}

module.exports = {
  tree,
  searchTree
}
