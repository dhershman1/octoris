const http = require('http')
const logger = require('pino')
const octo = logger({ name: 'octoris/core' })

const methods = require('./methods')
const response = require('./response')
const router = require('./router')
const utils = require('./utils')

/**
 * Handles core functionality to start a new node server and handle routing and setup
 * @public
 * @function
 * @param {Object} options The options object to provide to server.listen
 * @param {Function} routes The Route handler function built by `composeRoutes`
 * @return {Promise} A new promise based around starting the http server
 */
function listen (options, routes) {
  octo.info('Running with: %o', { routes, options })
  const server = http.createServer(routes)

  octo.info('Created %o', server)

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
  utils
}
