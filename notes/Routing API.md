# Routing API

There's multiple approaches to how I want to handle the routing APIs.

Though all of them are subject to change and be disgarded in favor of a different or combination of all of them.

I just want to get it down before I forget.

All of the below is **Subject to change**

## Idea 1

```js
const { route, matchingPath, matchingMethod } = require('octoris/router')

route([
  [matchingPath('/home'), matchingMethod('GET'), handlerFunction]
])

```

This idea is a step in the direction I can see it going but it's just not quite there yet, to much overhead and to much going on, I feel like I want to make it simpler.

## Idea 2

This one is another way of possibly handling the outcome this in itself also has multiple ways we could go.

```js
const { route, matchingPath, matchingMethod } = require('octoris/router')

const home = matchingPath('/home', [
  [matchingMethod('GET'), getHandler],
  [matchingMethod('POST'), postHanlder],
  [matchingMethod('PUT'), putHandler]
  // Etc...
])

// An array of route functions generated like the one above
route([home])
```

We could even break it down in a similar fashing like this:

```js
const { route, matchingPath, methods } = require('octoris/router')

// Either it could still follow a similar S Expression
const home = matchingPath('/home', [
  [methods.GET, getHandler],
  [methods.POST, postHandler]
  // Etc...
])

// Or we can go the route of passing the handler to our method directly
// NOTE: This isn't a "you can do it both ways" one or the other!

const about = matchingPath('/about', [
  methods.GET(getHandler),
  methods.POST(postHandler)
  // Etc...
])
```

I think this idea is a further step in the right direction for what I am shooting for though I can't help but feel like it's still a bit overly complex, and slightly annoying?
