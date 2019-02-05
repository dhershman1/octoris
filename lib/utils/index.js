const K = require('kyanite')

const _curry2 = require('../_internals/_curry2')
const _curry3 = require('../_internals/_curry3')

/**
 * Creates a context object to provide to a handler
 * TODO: Determine if this is actually needed or not (See the composeRoutes function)
 * Might be needed for cleanup or to make things flow better later on!
 * @public
 * @function
 * @param {Object} request The Node request object
 * @param {Object} response The Node response object
 * @param {Object} args The remaining arguments to add to our context object
 * @returns {Object} A new context based object
 */
function createContext (request, response, args = {}) {
  return {
    request,
    response,
    hostname: request.hostname || request.headers['host'],
    ...args
  }
}

/**
 * Combines an array of maps into a single map value
 * @function
 * @public
 * @param {Array} arr An array of maps to flatten and combine
 * @returns {Map} A new map of all the given array values
 */
function flattenMap (arr) {
  return K.reduce((v, acc) => acc ? new Map([...acc, ...v]) : v, null, arr)
}

/**
 * A find function that iterates through a Map and runs a function on the values returning the found value or undefined if nothing is found
 * @private
 * @public
 * @param {Function} fn The function to run against each value
 * @param {Map} map The map iterate through.
 * @returns {Any} The found data from the map, or undefined if nothing is found
 */
function mapFind (fn, map) {
  for (let res of map.entries()) {
    if (fn(res)) {
      return res
    }
  }
}

/**
 * Sets a value within a provided map
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
  mapFind: _curry2(mapFind),
  flattenMap,
  createContext,
  ...K
}
