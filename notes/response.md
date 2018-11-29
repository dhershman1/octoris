# Response

Response will be something you can use to create a response and return it to a client.

Like everything it will build out to it's own modules:

```js
const { redirect, send } = require('octoris/response')

const getHandler = ctx => {
  // Context isn't fleshed out enough yet to nail down an example
  if (!ctx.something) {
    return redirect(404, '/')
  }

  return send(200, 'You did it!')
}
```
