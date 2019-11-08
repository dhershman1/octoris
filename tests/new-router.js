const { GET, POST } = require('../lib/methods')
const { route, fixed, pipe } = require('../lib/router')
const { send } = require('../lib/response')

function middleware (a) {
  return a
}

const handler = ctx => send(ctx)

// const homeOrig = route([fixed('home'), fixed('ID')], [GET(handler), POST(handler)])

// const home = route([
//   [GET, [fixed('home')], handler]
// ])

// const myhome = route([
//   GET([fixed('home')], handler)
// ])

pipe([fixed('home'), fixed('main')], [GET(handler)], [middleware])

// console.log(route([fixed('home'), fixed('ID')], [GET(handler), POST(handler)]))
