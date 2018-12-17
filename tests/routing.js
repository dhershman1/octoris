const debug = require('debug')('octo:route:test')
const { inject } = require('../lib/utils')
const { send } = require('../lib/response')
const { route, fixed, param, routeReducer, concatRoutes } = require('../lib/router')
const { GET, POST } = require('../lib/methods')

function homeHandler (ctx) {
  return send(200, 'Hello World!')
}

function aboutHandler (ctx) {
  return send(200, 'About World!')
}

function accHandler (ctx) {
  debug('QUERY PARAMS! %o', ctx.query)
  return send(200, 'Account World!')
}

function dashHandler (ctx) {
  return send(200, 'Dashboard World!')
}

function placeHandler (ctx) {
  debug('Params: %o', ctx.params)
  return send(200, `Place World! id: ${ctx.params.id}, thing: ${ctx.params.thing}`)
}

const home = route([fixed('home')], [
  GET(homeHandler),
  POST(homeHandler)
])

const account = route([fixed('account')], [
  GET(accHandler)
])

const dash = route([fixed('dashboard')], [
  GET(dashHandler)
])

const about = route([fixed('about')], [
  GET(aboutHandler),
  POST(aboutHandler)
])

const place = route([fixed('place'), param('id'), param('thing')], [
  GET(placeHandler)
])

const main = concatRoutes([home], [account, dash])

const reduced = routeReducer([main, about, place])

// inject({ method: 'GET', url: '/home' }, reduced)
//   .then(res => debug('Success! %o', res.body))
//   .catch(err => debug('An error happened %o', err))

inject({ method: 'GET', url: '/home/account?id=123' }, reduced)
  .then(res => debug('Success! %o', res.body))
  .catch(err => debug('An error happened %o', err))

// inject({ method: 'GET', url: '/home/dashboard' }, reduced)
//   .then(res => debug('Success! %o', res.body))
//   .catch(err => debug('An error happened %o', err))

// inject({ method: 'GET', url: '/place/123/foo' }, reduced)
//   .then(res => debug('Success! %o', res.body))
//   .catch(err => debug('An error happened %o', err))
