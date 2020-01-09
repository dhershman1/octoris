const { router, response, methods, middleware } = require('../../../lib/index')
const { send } = response
const { route, all, fixed, param, composeRoutes } = router
const { GET } = methods

function homeHandler () {
  return new Promise(resolve => resolve(send(200, 'Hello Home!')))
}

function aboutHandler () {
  return new Promise(resolve => resolve(send(200, 'Hello About!')))
}

function fourOFour () {
  return new Promise(resolve => resolve(send(404, 'Uh oh! Couldn\'t find that!')))
}

const home = route([fixed('/')], [
  GET(homeHandler)
])

const about = route([fixed('about'), param('us')], [
  GET(aboutHandler)
])

const catchAll = route([all()], [
  GET(fourOFour)
])

module.exports = composeRoutes({ logger: true }, [about, home, catchAll], [middleware.serveStatic('public')])
