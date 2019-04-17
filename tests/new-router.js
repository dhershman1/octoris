const { GET, POST } = require('../lib/methods')
const { route, fixed } = require('../lib/router')
const { send } = require('../lib/response')

const handler = ctx => send(ctx)

console.log(route([fixed('home'), fixed('ID')], [GET(handler), POST(handler)]))
