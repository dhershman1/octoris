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

console.log(routeReducer([home, about]))
