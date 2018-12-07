const debug = require('debug')('octoris:methods')
/**
 * Example of how these will be used for reference
 *
 * route('/home', [GET(handler)])
 */

// These guys will need to be composeable to make a single usable function
// Currently these are placeholders until that idea comes to be
// Maybe this will return a wrapper version of the function?
function GET (handler) {
  debug('Creating GET method with %o', handler)
  // This should take a 2nd param (possibly) which will be the corpisponding middleware
  // Just a theory I had
  return function GET (middleware) {
    return handler
  }
}

function POST (handler) {
  debug('Creating POST method with %o', handler)
  return function POST () {
    return handler
  }
}

function PUT (handler) {
  debug('Creating PUT method with %o', handler)
  return function PUT () {
    return handler
  }
}

module.exports = {
  GET,
  POST,
  PUT
}
