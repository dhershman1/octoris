const http = require('http')
const { reduce } = require('kyanite')
const _assocǃ = require('./_internals/_assocǃ')
const debug = require('debug')('octoris:core')

/**
 * The server is startable. Without the other POC code breaking it.
 * TODO:
 * What needs to happen here is that we have to figure out how to handle routing
 * when the server initially starts up. Since the http package only accepts
 * 1 function, we need to break down and create our own to handle that so it will work
 * This shouldn't be to bad with some simple partial application but the strategy behind
 * it might be a little rough and need lots of improvements as we go.
 */

function octoris (options, routes) {
  debug('Running core with opts: %o', options)
  debug('Core given these routes: %o', routes)
  const server = http.createServer(routes)

  debug('Created %o', server)

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
