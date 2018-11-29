# Core

The core octoris function, this will be what you use in order to start your sever!

You can set it up like this:

```js
const routes = require('./routes')
const octoris = require('octoris')

octoris({
  port: 8080,
  middleware: [] // This will be an array of middleware functions?
}, routes)
  .then(() => console.log('Server Started!')))
  .catch(console.error)
```

**Important**: As per usual this is subject to change as we tweak and continue to enhance the framework

It is undetermined if this is how middleware will be given to the primary function this way or not.

I am thinking about possibly introducing helper functions to do something like this.

```js
const { use } = require('octoris/helpers')
const routes = require('./routes')

const app = {}

use(app, [middlewareFn1, middlewareFn2])
use(app, routes)

octoris({
  port: 8080
}, app)
```

This is also subject to change and it's not even a fully fleshed out accepted idea yet! This doesn't feel like the best way to break this down and there may be room for improvements.

I will move this over to the middleware markdown once I get to the point where I am ready to expand upon it!
