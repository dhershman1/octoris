# Errors & Wildcards

The response handler for wild cards such as `404`'s will need to be in place.

Currently I fixed a bug where this was impossible, now it fails silently which won't be the case later on.

What I am planning here is that we will give the user a Function for catch all routes, but as well a function for handling a `404`

In the response example the `redirect` function is being used. However I am going to stray away from that path.

I am most likely going to be working directly with the modle [https-errors](https://www.npmjs.com/package/http-errors) to make this a bit easier

## Catch Alls

The catch all can handle something that is missed in your routes It will be something like this:
```js
// A catch all
const { route, static, catchAll, routeReducer } = require('octoris/routes')
const { GET } = require('octoris/methods')

const home = route([statis('home')], [
  GET(getHandler)
])

const all = route([catchAll], catchHandler)

module.exports = routeReducer([home, all])
```

Now like all things this is far from the final design idea. I want to fiddle around with how I want it to work overall.

## 404's

These are obviously very important to handle obviously, the idea with these is to provide a fnction to handle 404s when the route is valid but nothing was found in the DB, and catch alls can be used for when routes are not defined.

These can usually be guided with tools like Nginx and it doesn't have to be app logic, but it is a nice to have and handle it automatically similar to how [express](https://expressjs.com/) & [fastify](https://www.fastify.io/) handle them.

The design pattern for this is still just theory and planning, nothing really solid to work with yet. If there will even need to be?
