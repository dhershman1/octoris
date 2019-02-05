# Testing

From the get go I want to make Octoris an easy to use but also easy to test framework.

The influence comes from stuff like [Fastify](https://www.fastify.io) with built in testing functionality. I'd even go so far as to take it a step up in this direction. Offering easy to use `inject` functionality, but maybe some other stuff in between to fully breakdown and test your routing and server setup.

## Usage

Currently all of the functionality exists in the `testing.js` file located within `lib/utils`

```js
const testing = require('octoris/utils/testing')
```

I plan to probably move this to either:

```js
const testing = require('octoris/testing')

// OR

const { testing } = require('octoris/utils')
```

Only the future knows on that front...

## Functions

### inject

#### Arguments

- `opts` - `Object` an object of options to be given to `light-my-request` you can see these [options here](https://github.com/fastify/light-my-request/blob/master/README.md#api)
- `route` - `Map|Function` The actual route created by octoris to run the inject against (More detail below)

#### Usage

```js
const { inject } = require('octoris/utils/testing')
const { send } = require('octoris/response')
const { route, fixed, composeRoutes } = require('octoris/router')
const { GET } = require('octoris/methods')

function homeHandler (ctx) {
  return send(200, 'Hello World!')
}

const home = route([fixed('home')], [
  GET(homeHandler)
])

// There are two ways you can approach this now by either composing the route or simply just sending it to inject

// This would work
inject({ method: 'GET', url: '/home?id=123' }, route)
  .then(console.info)
  .catch(console.error)

// But this would also work
inject({ method: 'GET', url: '/home?id=123' }, composeRoutes({}, route))
  .then(console.info)
  .catch(console.error)
```
