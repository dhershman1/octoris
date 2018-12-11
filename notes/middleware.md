# Middleware

The middleware engine will be a good chunk of the project to provide a great and easy to use ecosystem for others.

There's a few questions we need to answer with middleware:

## Via utils and within methods

This leads me to another option what if we applied middleware to our methods on the route level? Or well gave the _ability_ too!

```js
const { route, static } = require('octoris/router')
const { use } = require('octoris/utils')
const { GET, POST } = require('octoris/methods')
const someMiddleware = require('someMiddleware')
const someAuthMiddleware = require('someAuthMiddleware')

route([status('home')], [
  GET(getHomeHandler),
  use(someMiddleware),

  POST(postHomeHandler),
  use(someAuthMiddleware)
])

// Or possibly ?
route([status('home')], [
  [GET(getHomeHandler), use(someMiddleware)],
  [POST(postHomeHandler), use(someAuthMiddleware)]
])
```

This allows us to apply middleware directly to routes individually down to even the method like `POST`.

The problem is this might again be over complex and a little hard to read at first glance?
