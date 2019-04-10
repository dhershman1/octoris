const path = require('path')
const { router, response, methods } = require('../../../lib/index')
const { render } = response
const { route, fixed, composeRoutes } = router
const { GET } = methods

function homeHandler () {
  return render(path.resolve(__dirname, 'pages', 'home.html'))
}

function aboutHandler (ctx) {
  return render(path.resolve(__dirname, 'pages', 'about.html'))
}

const home = route([fixed('home')], [
  GET(homeHandler)
])

const about = route([fixed('about')], [
  GET(aboutHandler)
])

module.exports = composeRoutes({ logger: true }, [about, home])
