# Routing API

There's multiple approaches to how I want to handle the routing APIs.

Though all of them are subject to change and be disregarded in favor of a different approach or combination of all of them.

I just want to get it down before I forget.

All of the below is **Subject to change**

> Note (12/3/2018): Adding in the theory of a `routeReducer` function
> Note (12/7/2018): Adding in the theory of using a Radix Tree for routes

We bring in the `route` function to create a route and method listeners for it

with it we have helpers like `static` and `param` to build dynamic routes
```js
const { static, param, route, routeReducer } = require('octoris/router')
const { GET, POST, PUT } = require('octoris/methods')

const about = route([static('about')], [
  GET(getAboutHandler),
  POST(postAboutHandler)
])

const home = route([static('home')], [
  GET(getHomeHandler)
])

const item = route([static('item'), param('id')], [
  GET(getItemHandler),
  POST(postItemHandler),
  PUT(putItemHandler)
])

module.exports = routeReducer([about, home, item])
```

This will return a function of some kind this will be expecting `middleware` & the `context object`, the routes that are generated from the `route` function are put into an array and given to the `octoris` function.

`octoris` will handle creating the wrapper to make things work with the `http` package.

If you have multiple routes split between files you can do this: (Assuming both route js files look like the above code but instead of using `routeReducer` you would just wrap them in an array)

```js
const { octoris } = require('octoris')
const { routeReducer } = require('octoris/router')

// Instead of using routeReducer these would just return arrays
const htmlRoutes = require('./routes/html')
const apiRoutes = require('./routes/api')

// Then we can copy both route collections into a new array for routeReducer
octoris({ port: 8080 }, routeReducer([...htmlRoutes, ...apiRoutes]))
```

Visit the [core markdown](https://github.com/dhershman1/octoris/blob/master/notes/core.md) file to view more info on this process.

## routeReducer

So the idea is when you pass `routes` to the `octoris` core function they will look something like this in order to achieve this without the end user manually doing so, we can provide a `routeReducer` function that will build out a Map object for the core function
```js
Map {
  'home': Map {
    Symbol('get'): getHandler,
    Symbol('post'): postHandler
  },
  'about': Map {
    Symbol('get'): getAboutHandler,
    Symbol('post'): postAboutHandler
  },
  '/item/:id': Map {
    Symbol('get'): getItemHandler,
    Symbol('post'): postItemHandler,
    Symbol('put'): putItemHandler
  }
}
```

What I am thinking on a similar page to this is that instead of a simple string map layout I want to go with more of a [Radix Tree](https://en.wikipedia.org/wiki/Radix_tree) layout

So rather than something like:

```js
Map {
  'home': Map {
    Symbol('get'): getHandler
  },
  'home/id': Map {
    Symbol('get'): getHandler,
    Symbol('post'): postHandler
  }
}
```

We would structure it out to be more tree like: (This is far from the final cut of the plan obviously)

```js
Map {
  'home': Map {
    Symbol('get'): getHandler,
    'id': Map {
      Symbol('get'): getHandler,
      Symbol('post'): postHandler
    }
  }
}
```

This will make it easy for the core to piece together very lightweight logic to get routing up and running!

Obviously the above means we will most likely need to make some tweaks to **_HOW_** exactly the route method works, since we want to avoid the end user doing this manually.
