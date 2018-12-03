const http = require('http')
const { reduce } = require('kyanite')
const _assocǃ = require('./_internals/_assocǃ')

/**
 * The server is startable. Without the other POC code breaking it.
 * TODO:
 * What needs to happen here is that we have to figure out how to handle routing
 * when the server initially starts up. Since the http package only accepts
 * 1 function, we need to break down and create our own to handle that so it will work
 * This shouldn't be to bad with some simple partial application but the strategy behind
 * it might be a little rough and need lots of improvements as we go.
 */

// Status code is probably not needed here
function createContext (request, response) {
  return {
    statusCode: 404,
    request,
    response
  }
}

/**
 * FIXME:
 * Composer will be the guy that takes the routes and builds out a nice handler for the bulk of our
 * Route listeners, Check the notes for how I plan to tackle this!
 */
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
