const lmr = require('light-my-request')
const { type } = require('kyanite')

// Internals
const _curry2 = require('../_internals/_curry2')
const { composeRoutes } = require('../router')

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

module.exports = {
  inject: _curry2(inject)
}
