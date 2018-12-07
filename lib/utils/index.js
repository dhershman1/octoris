const K = require('kyanite')
const lmw = require('light-my-request')

const _curry2 = require('../_internals/_curry2')

// Will create the context object given to handlers
// Should contain the request/response objects
// And params, query, body, etc...
// More to come!
function createContext (request, response) {
  return {
    request,
    response
  }
}

function inject (opts, route) {
  return lmw(route, opts)
}


module.exports = {
  createContext: _curry2(createContext),
  inject: _curry2(inject),
  ...K
}
