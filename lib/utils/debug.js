const lmr = require('light-my-request')
const { type } = require('kyanite')

// Internals
const _curry2 = require('../_internals/_curry2')
const { composeRoutes } = require('../router')

// A collection of functions for debugging

/**
 * TODO: Needs to be expanded on for a more proper integration test setup
 * An inject function to run integration tests
 * @public
 * @function
 * @param {Object} opts Options to be given to light-my-request
 * @param {Map|Function} route The route/handler to run tests against
 */
function inject (opts, route) {
  if (type(route) === 'Function') {
    return lmr(route, opts)
  }

  return lmr(composeRoutes({}, [route]), opts)
}

/**
 * Converts a map to a key value pair object, this is useful mainly for logging purposes
 * @public
 * @function
 * @param {Map} map The map to convert
 * @returns {Object} A new Object built from the Map
 */
function toPairs (map) {
  const result = {}

  for (let [key, value] of map.entries()) {
    if (type(value) === 'Map') {
      Object.assign(result, { [key]: toPairs(value) })
    } else {
      Object.assign(result, { [key]: value })
    }
  }

  return result
}

/**
 * Takes a map and converts the entire thing into an object for debugging/logging purposes
 * @public
 * @function
 * @param {Map} map The map to convert to an Object
 * @returns {Object} The object created from the map
 */
function convertMap (map) {
  const result = {}

  for (let [key, value] of map.entries()) {
    switch (type(value)) {
      case 'Map':
        Object.assign(result, { [key]: convertMap(value) })
        break
      case 'Function':
        Object.assign(result, { [key]: '[Function]' })
        break
      default:
        Object.assign(result, { [key]: value })
    }
  }

  return result
}

module.exports = {
  inject: _curry2(inject),
  toPairs,
  convertMap
}
