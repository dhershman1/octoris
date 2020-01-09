const test = require('tape')
const router = require('../lib/router')
const { GET } = require('../lib/methods')

const getter = GET(() => true)
const home = router.route([router.fixed('home')], [GET(() => true)])
const about = router.route([router.fixed('about')], [GET(() => true)], [() => true])

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
