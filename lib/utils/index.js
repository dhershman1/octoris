const K = require('kyanite')
const lmw = require('light-my-request')

const _curry2 = require('../_internals/_curry2')

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

module.exports = {
  createContext: _curry2(createContext),
  inject: _curry2(inject),
  ...K
}
