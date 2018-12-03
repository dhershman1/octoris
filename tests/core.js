const octoris = require('../lib')
const { route, routeReducer } = require('../lib/router')
const { GET, POST } = require('../lib/methods')

function homeHandler (ctx) {
  console.log('home', ctx)
}

function aboutHandler (ctx) {
  console.log('about', ctx)
}

const home = route('/home', [
  GET(homeHandler)
])

const about = route('/about', [
  GET(aboutHandler),
  POST(aboutHandler)
])

octoris({ port: 3000 }, routeReducer([home, about]))
  .then(() => console.log('Server Running'))
  .catch(console.error)
