# Utils

Octoris will have several of it's own utilities, however it will also have available to entire [`kyanite`](https://github.com/dhershman1/kyanite) library as well.

Some of the non Kyanite built in functionality will include different functions like

## inject

A function used to inject and test routes. This is using the [light my request](https://github.com/jsumners/light-my-request) module. Which means it can also accept all of the same options.

### Arguments

- `options` - All of the same options accepted by light-my-request
- `handler` - This is the function that would be handling a request it will be given the `request`, `response` objects

You can use it like so:
```js
const { inject } = require('octoris/utils')

inject({ method: 'GET', url: '/home/account' }, (request, response) => {})
  .then(res => debug('Success! %o', res))
  .catch(err => debug('An error happened %o', err))
```

More Coming soon!
