# Middleware

The middleware engine will be a good chunk of the project to provide a great and easy to use ecosystem for others.

There's a few questions we need to answer with middleware:

## Engine

The engine idea currently looks a little like this, using the `use` function from the router portion of octoris

This will directly influence the middleware to always happen when this route is called.

I've broken it down into 3 ways to achieve this at different levels. We may or may not need each one to be its own thing but I figured starting with more is probably better for now.

## Method Middleware

In some instances we will want middleware to be used for individual methods rather than the entire route. In this instance maybe we allow our method functions to take a 2nd param which is the middleware?

```js
const { route, fixed } = require('octoris/router')
const { GET, POST } = require('octoris/methods')
const someMiddleware = require('someMiddleware')
const someAuthMiddleware = require('someAuthMiddleware')

route([fixed('home')], [
  GET(getHomeHandler, [someMiddleware]),
  POST(postHomeHandler, [someAuthMiddleware])
])
```

I have a few problems with this, the primary one is that it's sort of "assumed" you will know what that 2nd parameter is, it's not very straight forward or verbose in "this is how you set middleware for this method" kind of deal.

## Route Middleware

In the instance you want middleware to be applied to the entire route no matter what method is used we can apply it like so

```js
const { route, fixed, use } = require('octoris/router')
const { GET, POST } = require('octoris/methods')
const someMiddleware = require('someMiddleware')
const someAuthMiddleware = require('someAuthMiddleware')

route([fixed('home')], [
  use([someMiddleware, someAuthMiddleware]),
  GET(getHomeHandler),
  POST(postHomeHandler)
])
```

This allows us to apply middleware directly to routes individually down to even the method like `POST`.

The problem is this might again be over complex and a little hard to read at first glance?

## Global Middleware

So in some cases we may want middleware to be accessible to all of our routes vs individual methods/routes

In this instance I am thinking maybe attaching the middleware to the `composeRoutes` function or maybe we do apply it to the `listen` function. I don't think that's a good spot however.

```js
const { route, fixed, composeRoutes } = require('octoris/router')
const { GET, POST } = require('octoris/methods')
const someMiddleware = require('someMiddleware')
const someAuthMiddleware = require('someAuthMiddleware')

const home = route([fixed('home')], [
  GET(getHomeHandler),
  POST(postHomeHandler)
])

composeRoutes({
  logger: true,
  middleware: [someMiddleware, someAuthMiddleware]
})
```

This may or may not be the best approach?
