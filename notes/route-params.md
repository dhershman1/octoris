# Route Params

Apart of every framework is the ability to do routing params. Something simple like `/item/:id` that triggers when a route like `/item/123` is it, then providing the listen with an id param of 123.

Most frameworks jump for path-to-regexp for this, but I think we will sport our own solution. I have an idea I want to attempt here with our own system.

It would look like this:

```js
const { route, static, param } = require('octoris/router')
const { GET } = require('octoris/methods')
const { json } = require('octoris/response')

const handler = ctx => {
  return json(200, ctx.params)
}

const home = route([static('home'), param('id')], [
  GET(handler)
])

// This also allows for a easy mix
const about = route([static('about'), param('id'), static('place')], [
  GET(handler)
])
```

In the above our `home` const will look like `/home/:id` while the `about` const would look like `/about/:id/place`

The functions give us a nice and easy path building system.

But what about optional params? I got you fam:

```js
const { route, static, maybeParam } = require('octoris/router')
const { GET } = require('octoris/methods')
const { json } = require('octoris/response')

const homeHandler = ctx => {
  return json(200, ctx.params)
}

const home = route([static('home'), maybeParam('id')], [
  GET(homeHandler)
])
```

Now the above allows the `home` const to resolve to `/home/:id?` making id an optional value.

The name `maybeParam` is still a WIP though.
