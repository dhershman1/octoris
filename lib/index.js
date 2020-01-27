const http = require('http')
const methods = require('./methods')
const response = require('./response')
const router = require('./router')
const utils = require('./utils')
const debug = require('./utils/debug')

/**
 * Handles core functionality to start a new node server and handle routing and setup
 * @public
 * @function
 * @param {Object} options The options object to provide to server.listen
 * @param {Function} routes The Route handler function built by `composeRoutes`
 * @return {Promise} A new promise based around starting the http server
 */
function listen (options, routes) {
  const server = http.createServer(routes)

  return new Promise((resolve, reject) => {
    return server.listen(options, function serverCB (err) {
      if (err) {
        return reject(err)
      }

      return resolve(`${options.host || 'localhost'}:${options.port}`)
    })
  })
}

module.exports = {
  listen,
  methods,
  response,
  router,
  utils,
  debug
}
