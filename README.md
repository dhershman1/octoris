<p align=center>
  <a href="#" title="Octoris Repo">
    <img alt="Octoris Logo" src="https://user-images.githubusercontent.com/8997380/49382441-6a3a9280-f6e4-11e8-93b0-675e6f77112f.png">
  </a>
</p>

<p align=center>
  <a href="https://npmjs.com/package/octoris">
    <img alt="NPM version" src="https://img.shields.io/npm/v/octoris?style=flat-square" />
  </a>
  <a href="https://npmjs.com/package/octoris">
    <img alt="License" src="https://img.shields.io/npm/l/octoris?style=flat-square" />
  </a>
  <a href="https://app.circleci.com/github/dhershman1/octoris/pipelines">
    <img alt="Build Status" src="https://img.shields.io/circleci/build/github/dhershman1/octoris/master?style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/dhershman1/octoris">
    <img alt="Coverage Report" src="https://img.shields.io/codecov/c/github/dhershman1/octoris?style=flat-square" />
  </a>
</p>

<p align=center>
  <a href="https://github.com/standard/standard">
    <img alt="Standard Js" src="https://cdn.rawgit.com/standard/standard/master/badge.svg">
  </a>
</p>

A small and simple node server framework.

> **Important**: This is still under heavy development, I do not recommend production use yet, but please play with it and report problems/bugs

## Install

```
npm i octoris
```

## Usage

Create a basic server:
```js
const { listen } = require('octoris')
const routes = require('./routes')

listen({ port: 3000 }, routes)
  .then(addr => console.log(`Server Listening on ${addr}`))
  .catch(console.error)
```

routes.js:
```js
const { router, response, methods } = require('octoris')
const { send } = response
const { route, fixed, composeRoutes } = router
const { GET } = methods

function homeHandler () {
  return new Promise(resolve => resolve(send(200, 'Hello Home!')))
}

function aboutHandler () {
  return new Promise(resolve => resolve(send(200, 'Hello About!')))
}

const home = route([fixed('home')], [
  GET(homeHandler)
])

const about = route([fixed('about')], [
  GET(aboutHandler)
])

module.exports = composeRoutes({ logger: true }, [about, home])
```

## Documentation

Check out the github wiki as a temporary documentation spot until the site is up and running! https://github.com/dhershman1/octoris/wiki

## Official Middleware

Here is a list of official released middleware for Octoris

- [serve-static](https://github.com/octoris/serve-static)
- [body-parser](https://github.com/octoris/body-parser)

## Contribute

[Checkout the contribute file here](https://github.com/dhershman1/octoris/blob/master/.github/CONTRIBUTING.md)

Please check this file regularly as it is **Subject to change** and **updated** as the project continues to develop and grow!
