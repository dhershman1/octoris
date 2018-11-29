# Response

Response will be something you can use to create a response and return it to a client.

Like everything it will build out to it's own modules:

```js
const { redirect, send, setStatus } = require('octoris/response')

const getHandler = ctx => {
  // Context isn't fleshed out enough yet to nail down an example
  if (!ctx.something) {
    const status = setStatus(404)

    return redirect('/', status)
  }

  return send('You did it!')
}
```
