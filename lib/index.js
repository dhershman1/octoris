const http = require('http')
const logger = require('pino')({
  name: 'octoris/core',
  timestamp: false,
  base: {
    pid: null,
    hostname: null
  }
})

/**
 * Handles core functionality to start a new node server and handle routing and setup
 * @public
 * @function
 * @param {Object} options The options object to provide to server.listen
 * @param {Function} routes The final form of the function for route handling
 * @return {Promise} A new promise based around starting the http server
 */
function octoris (options, routes) {
  logger.info('Running with: %o', { routes, options })
  const server = http.createServer(routes)

  logger.info('Created %o', server)

  return new Promise((resolve, reject) => {
    return server.listen(options, function serverCB (err) {
      if (err) {
        return reject(err)
      }

      return resolve()
    })
  })
}

module.exports = octoris
