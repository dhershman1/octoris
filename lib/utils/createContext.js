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

module.exports = _curry2(createContext)
