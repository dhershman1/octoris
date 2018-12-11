const debug = require('debug')('octoris:methods')
/**
 * Example of how these will be used for reference
 *
 * route('/home', [GET(handler)])
 */

// These guys will need to be composeable to make a single usable function
// Currently these are placeholders until that idea comes to be
// Maybe this will return a wrapper version of the function?

function ALL (handler) {
  debug('Creating ALL method with %o', handler)

  return function ALL (ctx) {
    return handler(ctx)
  }
}

function GET (handler) {
  debug('Creating GET method with %o', handler)
  // This should take a 2nd param (possibly) which will be the corpisponding middleware
  // Just a theory I had
  return function GET (ctx) {
    return handler(ctx)
  }
}

function POST (handler) {
  debug('Creating POST method with %o', handler)
  return function POST (ctx) {
    return handler(ctx)
  }
}

function PUT (handler) {
  debug('Creating PUT method with %o', handler)
  return function PUT (ctx) {
    return handler(ctx)
  }
}

module.exports = {
  ALL,
  GET,
  POST,
  PUT
}
