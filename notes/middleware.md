# Middleware

The middleware engine will be a good chunk of the project to provide a great and easy to use ecosystem for others.

First things first, I need to figure out **_HOW_** exactly I want middleware to implement and work.

I have a few ideas:

## Via the Method Function

This is a way the popped into my head which may or may not be a good idea or totally unachievable and not user friendly!

Each of the methods has another function wrapper so `GET(handler)()(ctx)` What I am thinking is this: `GET(handler)(ctx, middleware)`
```js
function GET (handler) {
  return function GET (ctx, middleware) {
    // Possibly do something with the middleware here?
    return handler(ctx)
  }
```

The problem with doing it this way: `Is it really user friendly?` and secondly is it really available enough to middleware developers or is this to late in the game?

I'm gonna go with the latter on that one.

## Via the Core function

Another thought was to provide middleware to our core functionality

```js
const octoris = require('octoris')
const someMiddleware = require('someMiddleware')
const routes = require('./routes')

octoris({ port: 8080, middleware: [someMiddleware] }, routes)
```

The problem here is, well is it still an intuitive way to handle it? And again is this friendly to all sorts of middleware?

## Via helpers

I mentioned before the idea of helper functions like `use` well what if we used something similar here?

```js
const octoris = require('octoris')
const { use } = require('octoris/helpers')
const someMiddleware = require('someMiddleware')
const routes = require('./routes')

const main = use([someMiddleware])

octoris({ port: 8080, main }, routes)
```

The problem here is that maybe this is to complex? Overkill even for what we want to achieve this may also lead to a lot of later mutation of the main being passed in.

Then the point of what even is main here? What could it be? I'm not a huge fan, but this follows a pattern more close to express like.

## Via helpers and within methods

This leads me to another option what if we applied middleware to our methods on the route level? Or well gave the _ability_ too!

```js
const { route, static } = require('octoris/router')
const { use } = require('octoris/helpers')
const { GET, POST } = require('octoris/methods')
const someMiddleware = require('someMiddleware')
const someAuthMiddleware = require('someAuthMiddleware')

route([status('home')], [
  GET(getHomeHandler),
  use(someMiddleware),

  POST(postHomeHandler),
  use(someAuthMiddleware)
])
```

This allows us to apply middleware directly to routes individually down to even the method like `POST`.

The problem is this might again be over complex and a little hard to read at first glance?
