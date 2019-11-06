const path = require('path')
const fs = require('fs')
const util = require('util')
const { router, response, methods } = require('../../../lib/index')
const { send } = response
const { route, fixed, composeRoutes } = router
const { GET } = methods
const readFile = util.promisify(fs.readFile)

function homeHandler () {
  return readFile(path.resolve(__dirname, 'pages', 'home.html'))
    .then(data => send(200, data))
    .catch(err => send(500, err))
}

function aboutHandler () {
  return readFile(path.resolve(__dirname, 'pages', 'about.html'))
    .then(data => send(200, data))
    .catch(err => send(500, err))
}

const home = route([fixed('home')], [
  GET(homeHandler)
])

const about = route([fixed('about')], [
  GET(aboutHandler)
])

module.exports = composeRoutes({ logger: true }, [about, home])
