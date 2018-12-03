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

function handleRequest (routes) {
  return function (request, response) {
    const ctx = createContext(request, response)
    // Currently only getting the handler function we can
    // Don't think this will properly work with the symbols, will need to use regex
    // Do some kajiggering to handle dynamic routes here
    const handler = routes.get(request.path).get(request.method)

    return handler(ctx)(ctx)
  }
}

function octoris (options, routes) {
  const server = http.createServer(handleRequest(routes))

  return server.listen.apply(server, options)
}

module.exports = octoris
