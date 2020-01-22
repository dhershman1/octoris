const test = require('tape')
const router = require('../lib/router')
const { GET } = require('../lib/methods')
const { send } = require('../lib/response')

const getter = GET(() => true)
const home = router.route([router.fixed('home')], [GET(ctx => send(200, ctx))])
const about = router.route([router.fixed('about')], [GET(() => Promise.resolve(() => true))], [() => true])

const req = {
  url: 'http://example.com/home?q=foobar',
  method: 'GET'
}

test('router.param(p)', t => {
  const data = router.param('foo')

  t.same(data, new Map([['name', 'foo'], ['type', 'param']]))
  t.end()
})

test('router.fixed(uri)', t => {
  const data = router.fixed('foo')

  t.same(data, new Map([['name', 'foo'], ['type', 'static']]))
  t.end()
})

test('router.all()', t => {
  const data = router.all()

  t.same(data, new Map([['name', 'all'], ['type', 'catch-all']]))
  t.end()
})

test('router.route(routePath, methods, middleware)', t => {
  const str = router.route(['string'], [GET(() => true)])

  t.same(home, new Map([
    ['home', new Map([
      ['name', 'home'],
      ['type', 'static'],
      ['methods', new Map([['GET', getter]])],
      ['middleware', []]
    ])]
  ]))
  t.same(about, new Map([
    ['about', new Map([
      ['name', 'about'],
      ['type', 'static'],
      ['methods', new Map([['GET', getter]])],
      ['middleware', [() => true]]
    ])]
  ]))
  t.same(str, new Map([
    ['string', new Map([
      ['name', 'string'],
      ['type', 'static'],
      ['methods', new Map([['GET', getter]])],
      ['middleware', []]
    ])]
  ]))
  t.end()
})

test('router.concatRoutes(root, routes)', t => {
  const result = router.concatRoutes([home], [about])

  t.same(result, new Map([
    ['home', new Map([
      ['name', 'home'],
      ['type', 'static'],
      ['methods', new Map([['GET', getter]])],
      ['middleware', []],
      ['about', new Map([
        ['name', 'about'],
        ['type', 'static'],
        ['methods', new Map([['GET', getter]])],
        ['middleware', [() => true]]
      ])]
    ])]
  ]))
  t.same(result.get('home').get('about'), new Map([
    ['name', 'about'],
    ['type', 'static'],
    ['methods', new Map([['GET', getter]])],
    ['middleware', [() => true]]
  ]))
  t.end()
})

test('router.composeRoutes(opts, routes, mw) Initialization', t => {
  const results = router.composeRoutes({ logger: true }, [home, about])
  const resultsNoLogger = router.composeRoutes({ logger: false }, [home])
  const resultsCustomLogger = router.composeRoutes({ logger: { name: 'test' } }, [about], [() => true])

  t.same(typeof results, 'function', 'Results returned is a function')
  t.same(typeof resultsNoLogger, 'function', 'Still returns a function with no logger attached')
  t.same(typeof resultsCustomLogger, 'function', 'With custom logger info still returns a function')
  t.end()
})

test('router.composeRoutes(opts, routes, mw) Functionality', t => {
  const listener = router.composeRoutes({ logger: true }, [home, about])
  const res = {
    finished: false,
    writeHead () {
      return true
    },

    end (a) {
      this.finished = true

      return a
    }
  }

  listener(req, res).then(ctx => {
    t.same(ctx.response.headers, {}, 'Headers object was set within response')
    t.same(typeof ctx.response.setHeaders, 'function', 'setHeaders function was set within response')
    ctx.response.setHeaders({ foo: 'bar' })
    t.same(ctx.response.headers, { foo: 'bar' }, 'Able to set headers within response')
    t.same(ctx.search, 'q=foobar', 'Search query was set')
    t.same(ctx.query.q, 'foobar', 'Query object set')
    t.end()
  })
})

test('router.composeRoutes(opts, routes, mw) already finished', t => {
  const listener = router.composeRoutes({ logger: true }, [home, about])
  const res = {
    finished: true,
    writeHead (status, type) {
      this.status = status
      this.contentType = type
    },

    end (a) {
      this.finished = true

      return a
    }
  }

  listener(req, res).then(ctx => {
    t.same(ctx, undefined, 'Context is undefined and a 404 is thrown')
    t.end()
  })
})

test('router.composeRoutes(opts, routes, mw) route not found', t => {
  const listener = router.composeRoutes({ logger: true }, [about])
  const res = {
    finished: false,
    writeHead (status, type) {
      this.status = status
      this.contentType = type
    },

    end (a) {
      this.finished = true

      return a
    }
  }

  listener(req, res).then(ctx => {
    t.same(ctx, 'Unable to find http://example.com/home?q=foobar', 'Got back 404 message')
    t.end()
  })
})

test('router.composeRoutes(opts, routes, mw) error handling', t => {
  const listener = router.composeRoutes({ logger: false }, [home, about], [() => true])
  const res = {
    finished: false,
    writeHead (status, type) {
      this.status = status
      this.contentType = type
    },

    end (a) {
      this.finished = true
      this.response = a

      return a
    }
  }

  listener(req, res).then(() => {
    t.same(res.status, 500, 'Status set to 500', 'Set status code to 500')
    t.same(res.response, 'Something borked Jim!', 'Gave back error message')
  })
    .finally(() => t.end())
})
