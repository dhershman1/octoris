const { inject } = require('../lib/utils/debug')
const { send } = require('../lib/response')
const { route, fixed, param, composeRoutes, concatRoutes } = require('../lib/router')
const { GET, POST } = require('../lib/methods')

function homeHandler (ctx) {
  ctx.logger.info('Success!')
  ctx.logger.info(`ID Query: ${ctx.query.id}`)

  return send(200, 'Hello World!')
}

function aboutHandler (ctx) {
  return send(200, 'About World!')
}

function accHandler (ctx) {
  return send(200, 'Account World!')
}

function dashHandler (ctx) {
  return send(200, 'Dashboard World!')
}

function placeHandler (ctx) {
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

const routes = [main, about, place]

inject({ method: 'GET', url: '/home?id=123' }, composeRoutes({ logger: { name: 'TESTING:ROUTES' } }, routes))
  .then(res => console.log('Success! %o', res.body))
  .catch(err => console.error('An error happened %o', err))

// inject({ method: 'GET', url: '/home/account?id=123' }, routes)
//   .then(res => console.log('Success! %o', res.body))
//   .catch(err => console.error('An error happened %o', err))

// inject({ method: 'GET', url: '/home/dashboard' }, routes)
//   .then(res => console.log('Success! %o', res.body))
//   .catch(err => console.error('An error happened %o', err))

// inject({ method: 'GET', url: '/place/123/foo' }, routes)
//   .then(res => console.log('Success! %o', res.body))
//   .catch(err => console.error('An error happened %o', err))
