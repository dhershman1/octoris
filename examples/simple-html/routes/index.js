const fs = require('fs')
const path = require('path')
const { router, response, methods } = require('../../../lib/index')
const { send } = response
const { route, fixed, composeRoutes } = router
const { GET } = methods

// These handlers don't work at the moment
// This is because the handler methods don't work very nicely with async
// Since most of the time they're expecting just the response to be returned
// Not to be used within a callback like with fs here
function homeHandler (ctx) {
  return fs.readFile(path.resolve(__dirname, 'pages', 'home.html'), (err, data) => {
    if (err) {
      ctx.logger.error('Error in Getting file')

      return send(500, 'Something went wrong!')
    }

    return send(200, data)
  })
}

function aboutHandler (ctx) {
  return fs.readFile(path.resolve(__dirname, 'pages', 'about.html'), (err, data) => {
    if (err) {
      ctx.logger.error('Error in Getting file')

      return send(500, 'Something went wrong!')
    }

    return send(200, data)
  })
}

const home = route([fixed('home')], [
  GET(homeHandler)
])

const about = route([fixed('about')], [
  GET(aboutHandler)
])

module.exports = composeRoutes({ logger: true }, [about, home])
