const debug = require('debug')('octo:utils')
const K = require('kyanite')
const lmw = require('light-my-request')

const _curry2 = require('../_internals/_curry2')
const _curry3 = require('../_internals/_curry3')

// Will create the context object given to handlers
// Should contain the request/response objects
// And params, query, body, etc...
// More to come!
function createContext (request, response, args = {}) {
  return {
    request,
    response,
    ...args
  }
}

/**
 * TODO: Needs to be expanded on for a more proper integration test setup
 * An inject function to run integration tests
 * @public
 * @function
 * @param {Object} opts Options to be given to light-my-request
 * @param {Function} route The route/handler to run tests against
 */
function inject (opts, route) {
  return lmw(route, opts)
}

function use (fn) {

}

function mapFind (fn, map) {
  for (let res of map.entries()) {
    debug(fn(res))
    if (fn(res)) {
      return res
    }
  }
}

function set (key, data, map) {
  return new Map([...map, [key, data]])
}

function get (key, map) {
  return map.get(key)
}

module.exports = {
  inject: _curry2(inject),
  get: _curry2(get),
  set: _curry3(set),
  mapFind: _curry2(mapFind),
  setParam,
  createContext,
  use,
  ...K
}
