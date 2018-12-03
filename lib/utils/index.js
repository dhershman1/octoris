const lmw = require('light-my-request')
const _curry2 = require('../_internals/_curry2')

function inject (opts, route) {
  return lmw(route, opts)
}

module.exports = {
  inject: _curry2(inject)
}
