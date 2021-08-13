const { reduce } = require('kyanite')

const _curry2 = require('../_internals/_curry2')
const _curry3 = require('../_internals/_curry3')

/**
 * A reducer used to merge a list of maps into a single map
 * @private
 * @function
 * @param {Map} map The map data type we are reducing
 * @param {Map} acc The new map we are reducing to
 * @returns {Map} The merged map
 */
function mergeMapsReducer (map, acc) {
  for (const [key, val] of map) {
    acc.set(key, val)
  }
  return acc
}

/**
 * Combines an array of maps into a single map value
 * @public
 * @function
 * @param {Array} listOfMaps An array of maps to merge them together
 * @returns {Map} A new map of all the given array values
 */
function mergeMaps (listOfMaps) {
  return reduce(mergeMapsReducer, new Map(), listOfMaps)
}

/**
 * A find function that iterates through a Map and runs a function on the values returning the found value or undefined if nothing is found
 * @public
 * @function
 * @param {Function} pred The function to run against each value
 * @param {Map} map The map iterate through.
 * @returns {Any} The found data from the map, or undefined if nothing is found
 */
function findInMap (pred, map) {
  for (const res of map) {
    if (pred(res)) {
      return res
    }
  }
}

/**
 * A simple curried wrapper that sets a value within a provided map
 * @public
 * @function
 * @param {String} key The key to set the data to within the map
 * @param {Any} data The data to set to our given key
 * @param {Map} map The map to add the data too
 * @returns {Map} A new map with the value set
 */
function set (key, data, map) {
  return map.set(key, data)
}

/**
 * Grabs a value from a provided map using a provided key
 * @public
 * @function
 * @param {Sting} key The key to get from the map
 * @param {Map} map The map to get the value from
 * @returns {Any} The value attached to the provided key
 */
function get (key, map) {
  return map.get(key)
}

module.exports = {
  get: _curry2(get),
  set: _curry3(set),
  findInMap: _curry2(findInMap),
  mergeMaps
}
