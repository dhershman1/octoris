const { GET, POST } = require('../lib/methods')
const { route, fixed } = require('../lib/router')
const { send } = require('../lib/response')

const handler = ctx => send(ctx)

// const homeOrig = route([fixed('home'), fixed('ID')], [GET(handler), POST(handler)])

// const home = route([
//   [GET, [fixed('home')], handler]
// ])

// const myhome = route([
//   GET([fixed('home')], handler)
// ])

console.log(route([fixed('home'), fixed('ID')], [GET(handler), POST(handler)]))
