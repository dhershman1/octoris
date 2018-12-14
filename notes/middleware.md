# Middleware

The middleware engine will be a good chunk of the project to provide a great and easy to use ecosystem for others.

There's a few questions we need to answer with middleware:

## Engine

The engine idea currently looks a little like this, using the "use" util

> **Note** This may be moved to the `octoris/middleware` if the need for more functionality in this area grows

```js
const { route, static } = require('octoris/router')
const { use } = require('octoris/utils')
const { GET, POST } = require('octoris/methods')
const someMiddleware = require('someMiddleware')
const someAuthMiddleware = require('someAuthMiddleware')

route([static('home')], [
  GET(getHomeHandler),
  use(someMiddleware),

  POST(postHomeHandler),
  use(someAuthMiddleware)
])

// Or possibly ?
route([static('home')], [
  [GET(getHomeHandler), use(someMiddleware)],
  [POST(postHomeHandler), use(someAuthMiddleware)]
])
```

This allows us to apply middleware directly to routes individually down to even the method like `POST`.

The problem is this might again be over complex and a little hard to read at first glance?
