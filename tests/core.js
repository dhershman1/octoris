const octoris = require('../lib')
const { send } = require('../lib/response')
const { route, routeReducer } = require('../lib/router')
const { GET, POST } = require('../lib/methods')

function homeHandler (ctx) {
  return send(200, 'Hello Home!')
}

function aboutHandler (ctx) {
  return send(200, 'Hello About!')
}

function aboutPost () {
  return send(200, 'Hello About Post!')
}

const home = route('/home', [
  GET(homeHandler)
])

const about = route('/about', [
  GET(aboutHandler),
  POST(aboutPost)
])

octoris({ port: 3000 }, routeReducer([home, about]))
  .then(() => console.log('Server Running'))
  .catch(console.error)
