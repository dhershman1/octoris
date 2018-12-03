const debug = require('debug')('octoris:route:test')
const inject = require('light-my-request')
const { send } = require('../lib/response')
const { route, routeReducer } = require('../lib/router')
const { GET, POST } = require('../lib/methods')

function homeHandler (ctx) {
  return send(200, 'Hello World!')
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

const dispatch = routeReducer([home, about])

inject(dispatch, { method: 'get', url: '/home' }, (err, res) => {
  if (err) {
    debug('An Error happened %o', err)
  } else {
    debug('Success! %o', res)
  }
})

// debug(routeReducer([home, about]))


