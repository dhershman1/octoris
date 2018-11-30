const http = require('http')
const { reduce } = require('kyanite')
const _assocǃ = require('./_internals/_assocǃ')

// Status code is probably not needed here
function createContext (request, response) {
  return {
    statusCode: 404,
    request,
    response
  }
}

// The goal for composer is to turn our routes into a single function
// That we can provide to our context/middleware to?
// Remember: This is all placeholder concepts
// Will return a new object of route paths and the object of handlers associated with them
function composer (routes) {
  return reduce(({ name, handlers }, acc) => {
    // r will be an object
    // Maybe if we see a need to pass it other items
    // It can be a function instead?
    return _assocǃ(acc, name, handlers)
  }, {}, routes)
}

function octoris (options, routes) {
  // Compose routes down to a single router function
  // Rename composer if needed etc etc this is just a POC
  const router = composer(routes)

  const server = http.createServer((req, res) => {
    const ctx = createContext(req, res)

    // Router can accept a 2nd param this should be the composed middleware
    return router(ctx)
  })

  return server.listen.apply(server, options)
}

module.exports = octoris
