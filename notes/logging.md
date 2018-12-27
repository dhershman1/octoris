# Logging

Another point of conversation is how do we want to handle Logging? I think [Pino](https://www.npmjs.com/package/pino) is our best bet as it's super fast and fairly straight forward to use/setup.

## Usage

The logger is going to be [Pino](https://www.npmjs.com/package/pino) for blazing fast capabilities, to use it is rather simple:

```js
const octoris = require('octoris')

// Simply passing true enables the default logging from pino
octoris({
  port: 3000,
  logging: true
})

// Or you can provide an object of options (supported by Pino)
octoris({
  port: 8080,
  logging: {
    name: 'My App',
    level: 'info'
  }
})

// For items like pino.destination simply provide a file property with a string to the file destination
octoris({
  port: 8081,
  logging: {
    level: 'info',
    file: '/path/to/file'
  }
})
```

You can find all of the available options/methods in the [Pino API Documentation](https://github.com/pinojs/pino/blob/master/docs/api.md#pinooptions-stream)

Once you specify `logging` as a either true or an object of options you will have access to logging driectly from the context object

```js
const { fixed, route, routeReducer } = require('octoris/router')
const { GET } = require('octoris/methods')
const { send } = require('octoris/response')
const octoris = require('octoris')

const getHandler = ctx => {
  ctx.logger.info('Some info about this request handler')

  return send(200, 'Hello!')
}

const home = route([fixed('home')], [GET(getHandler)])

octoris({
  port: 8080,
  logging: true
}, routeReducer([home]))
```

The above will allow you to log each time `/home` is hit via the client.

## Streams

If you want to pass in a custom stream to the [Pino](https://www.npmjs.com/package/pino) instance you can attach it via the `stream` property in the logging object

```js
const split = require('split2')
const octoris = require('octoris')

const stream = split(JSON.parse)

octoris({
  port: 8080,
  logging: {
    level: 'info',
    stream
  }
})
```

## Serializers

By default `octoris` is setup with a standard serializer for the `ctx` and `err` properties, you can customize this behavior using custom serializers.

```js
const octoris = require('octoris')

octoris({
  port: 8080,
  logging: {
    serializers: {
      ctx (ctx) {
        return { url: ctx.request.url }
      }
    }
  }
})
```

## Redaction

[Pino](https://www.npmjs.com/package/pino) supports low-overhead log redaction for obscuring values of specific properties in recorded logs. You can easily do this in octoris by providing a redact property with an array of strings you want to redact.

For instance if you wanted to log HTTP headers but wanted to skip the `Authorization` header for security concerns you could easily do:

```js
const octoris = require('octoris')

octoris({
  port: 8080,
  logging: {
    redact: ['req.headers.authorization']
  }
})
```

Now when you log the headers in your log file the `Authorization` header will appear as `"Authorization": "[Redacted]"`

You can Visit [Pinos Redaction Documentation](https://getpino.io/#/docs/redaction) to get more info on this process and what it supports
