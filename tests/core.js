const { listen, router, methods, response } = require('../lib')
const { send } = response
const { route, fixed, composeRoutes } = router
const { GET, POST } = methods

function homeHandler (ctx) {
  return send(200, 'Hello Home!')
}

function aboutHandler (ctx) {
  return send(200, 'Hello About!')
}

function aboutPost () {
  return send(200, 'Hello About Post!')
}

const home = route([fixed('home')], [
  GET(homeHandler)
])

const about = route([fixed('about')], [
  GET(aboutHandler),
  POST(aboutPost)
])

const routes = composeRoutes({ logger: { name: 'TESTING:ROUTES' } }, [home, about])

listen({ port: 3000 }, routes)
  .then(addr => console.log(`Server Running on ${addr}`))
  .catch(console.error)
