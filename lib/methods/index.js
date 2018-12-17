const debug = require('debug')('octoris:methods')

/**
 * Method for handling GET requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function GET (handler) {
  debug('Creating GET method with %o', handler)
  // This should take a 2nd param (possibly) which will be the corpisponding middleware
  // Just a theory I had
  return function GET (ctx) {
    return handler(ctx)
  }
}

/**
 * Method for handling POST requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function POST (handler) {
  debug('Creating POST method with %o', handler)
  return function POST (ctx) {
    return handler(ctx)
  }
}

/**
 * Method for handling PUT requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function PUT (handler) {
  debug('Creating PUT method with %o', handler)
  return function PUT (ctx) {
    return handler(ctx)
  }
}

/**
 * Method for handling DELETE requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function DELETE (handler) {
  debug('Creating DELETE method with %o', handler)
  return function DELETE (ctx) {
    return handler(ctx)
  }
}

module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
