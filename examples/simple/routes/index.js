const { router, response, methods } = require('../../../lib/index')
const { send } = response
const { route, fixed, composeRoutes } = router
const { GET } = methods

function homeHandler () {
  return send(200, 'Hello Home!')
}

function aboutHandler () {
  return send(200, 'Hello About!')
}

const home = route([fixed('home')], [
  GET(homeHandler)
])

const about = route([fixed('about')], [
  GET(aboutHandler)
])

module.exports = composeRoutes({ logger: true }, [about, home])
