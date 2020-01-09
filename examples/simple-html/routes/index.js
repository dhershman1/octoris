const path = require('path')
const fs = require('fs')
const util = require('util')
const { router, response, methods } = require('../../../lib/index')
const { send } = response
const { route, fixed, composeRoutes } = router
const { GET } = methods
const readFile = util.promisify(fs.readFile)
const OK = send(200)
const ERR = send(500)

function middleware (ctx) {
  ctx.response.cool = 'What what!'

  return ctx
}

function homeHandler ({ response }) {
  console.log(response.cool)
  return readFile(path.resolve(__dirname, 'pages', 'home.html'))
    .then(data => {
      response
        .setHeaders({
          cool: 'kid',
          foo: 'bar'
        })

      return OK(data)
    })
    .catch(ERR)
}

function aboutHandler () {
  return readFile(path.resolve(__dirname, 'pages', 'about.html'))
    .then(OK)
    .catch(ERR)
}

const home = route([fixed('home')], [
  GET(homeHandler)
], [middleware])

const about = route([fixed('about')], [
  GET(aboutHandler)
])

module.exports = composeRoutes({ logger: true }, [about, home])
