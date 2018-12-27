// const debug = require('debug')('octoris:methods')

/**
 * Method for handling CONNECT requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function CONNECT (handler) {
  return function CONNECT (ctx) {
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
  return function DELETE (ctx) {
    return handler(ctx)
  }
}

/**
 * Method for handling GET requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function GET (handler) {
  return function GET (ctx) {
    return handler(ctx)
  }
}

/**
 * Method for handling HEAD requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function HEAD (handler) {
  return function HEAD (ctx) {
    return handler(ctx)
  }
}

/**
 * Method for handling OPTIONS requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function OPTIONS (handler) {
  return function OPTIONS (ctx) {
    return handler(ctx)
  }
}

/**
 * Method for handling PATCH requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function PATCH (handler) {
  return function PATCH (ctx) {
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
  return function PUT (ctx) {
    return handler(ctx)
  }
}

/**
 * Method for handling TRACE requests
 * @public
 * @function
 * @param {Function} handler The handler for this method type
 * @return {Function} A new Function to use a provided handler
 */
function TRACE (handler) {
  return function TRACE (ctx) {
    return handler(ctx)
  }
}

module.exports = {
  CONNECT,
  DELETE,
  GET,
  HEAD,
  OPTIONS,
  PATCH,
  POST,
  PUT,
  TRACE
}
