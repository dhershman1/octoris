# Router Refactor

So in it's current state the [router](https://github.com/dhershman1/octoris/blob/master/notes/core.md) works well, however there are a few problems:

- The Http Methods don't do much at all
- The current reponse setup doesn't work well with Async at all
- The current reponse setup is sort of ugly to use (under the hood)
- The `route` function is currently a little overloaded in my opinion

So to approach this the underlying router flow needs some love and refactoring.

## Addressing Router Overload

So for the router overload I currently have an idea that may or may not work but also may contribute to complexity.

> NOTE: The response methods are in debate of if they should be a part of the context object or not

```js
const octoris = require('octoris')
const { composeRoutes, fixed, httpMethods, response, route } = require('octoris/router')
const { GET, POST } = httpMethods

const homeHandler = () => response.send(200, 'Hello Home')
const aboutHandler = () => response.send(200, 'Hello About')

const home = route([fixed('home')])
const about = route([fixed('about')])

const routing = compostRoutes([
  GET(homeHandler, home),
  GET(aboutHandler, about),
  POST(aboutHandler, about)
])

octoris({ port: 3000 }, routing)
  .then(addr => console.log(`Server Started at: ${addr}`))
  .catch(console.error)
```
