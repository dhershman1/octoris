# Routing API

There's multiple approaches to how I want to handle the routing APIs.

Though all of them are subject to change and be disregarded in favor of a different approach or combination of all of them.

I just want to get it down before I forget.

All of the below is **Subject to change**

> Note (12/3/2018): Adding in the theory of a `routeReducer` function

We bring in the `route` function to create a route and method listeners for it
Please note: `dynamicRoute` you see below is an idea-in-process
```js
const { route, dynamicRoute, routeReducer } = require('octoris/router')
const { GET, POST, PUT } = require('octoris/methods')

const about = route('/about', [
  GET(getAboutHandler),
  POST(postAboutHandler)
])

const home = route('/home', [
  GET(getHomeHandler)
])

const item = dynamicRoute('/item/:id', [
  GET(getItemHandler),
  POST(postItemHandler),
  PUT(putItemHandler)
])

module.exports = routeReducer([about, home, item])
```

This will return a function of some kind this will be expecting `middleware` & the `context object`, the routes that are generated from the `route` function are put into an array and given to the `octoris` function.

`octoris` will handle creating the wrapper to make things work with the `http` package.

Visit the [core markdown](https://github.com/dhershman1/octoris/blob/master/notes/core.md) file to view more info on this process.

## routeReducer

So the idea is when you pass `routes` to the `octoris` core function they will look something like this in order to achieve this without the end user manually doing so, we can provide a `routeReducer` function that will build out a Map object for the core function
```js
Map {
  Symbol '/home': Map {
    Symbol get: getHandler,
    Symbol post: postHandler
  },
  Symbol '/about': Map {
    Symbol get: getAboutHandler,
    Symbol post: postAboutHandler
  },
  Symbol '/item/:id': Map {
    Symbol get: getItemHandler,
    Symbol post: postItemHandler,
    Symbol put: putItemHandler
  }
}
```

This will make it easy for the core to piece together very lightweight logic to get routing up and running!

Obviously the above means we will most likely need to make some tweaks to **_HOW_** exactly the route method works, since we want to avoid the end user doing this manually.
