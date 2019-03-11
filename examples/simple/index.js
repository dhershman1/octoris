const { listen } = require('../../lib/index')
const routes = require('./routes')

listen({ port: 3000 }, routes)
  .then(addr => console.log(`Server Listening on ${addr}`))
  .catch(console.error)
