# Middleware

The middleware engine will be a good chunk of the project to provide a great and easy to use ecosystem for others.

There's a few questions we need to answer with middleware:

## Engine

The engine idea currently looks a little like this, using the "use" util

> **Note** This may be moved to the `octoris/middleware` if the need for more functionality in this area grows

```js
const { route, fixed } = require('octoris/router')
const { use } = require('octoris/utils')
const { GET, POST } = require('octoris/methods')
const someMiddleware = require('someMiddleware')
const someAuthMiddleware = require('someAuthMiddleware')

route([fixed('home')], [
  GET(getHomeHandler),
  use(someMiddleware),

  POST(postHomeHandler),
  use(someAuthMiddleware)
])

// Or possibly ?
route([fixed('home')], [
  [GET(getHomeHandler), use(someMiddleware)],
  [POST(postHomeHandler), use(someAuthMiddleware)]
])
```

This allows us to apply middleware directly to routes individually down to even the method like `POST`.

The problem is this might again be over complex and a little hard to read at first glance?

## Middleware Branch Concept

Another theory/concept could be that middleware is given a branch within the Radix Tree of routes. For instance `/home` with a `GET` forms a Radix tree that looks like this:
```js
Map {
  'home': Map {
    type: 'static'
    optional: false,
    methods: Map {
      'GET': Function
    }
  }
}
```

So what if a middleware being attached to a route method just becomes a value within that Map something like this:
```js
Map {
  'home': Map {
    type: 'static'
    optional: false,
    methods: Map {
      'GET': Map(?*) {
        handler: Function,
        middleware: Function[] || Set
      }
    }
  }
}
```
> **(?*)**: This doesn't need to be a Map, this could easily just be an Object here

With the above when the `/home` route is triggered it will look at the `GET` handler and see if any middleware is also there, if so use that first and then the handler.

> **Important**: This layout would be used even if there was no attached middleware, in that instance `middleware` would just be an empty Array/Set
