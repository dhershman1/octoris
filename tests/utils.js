const test = require('tape')
const utils = require('../lib/utils')

test('utils.mergeMaps()', t => {
  const foo = new Map([['a', 1]])
  const bar = new Map([['b', 2]])
  const foobar = utils.mergeMaps([foo, bar])

  t.same(foobar, new Map([['a', 1], ['b', 2]]))
  t.end()
})

test('utils.findInMap()', t => {
  const data = new Map([['a', 1], ['b', 2], ['c', 3]])

  t.same(utils.findInMap(x => x[1] > 2, data), ['c', 3])
  t.end()
})

test('utils.set()', t => {
  const data = new Map()

  t.same(utils.set('foo', 'bar', data), new Map([['foo', 'bar']]), 'Set key within map')
  t.end()
})

test('utils.get()', utils.get(), t => {
  const data = new Map([['foo', 'bar']])

  t.same(utils.get('foo', data), 'bar', 'Retrieved value from within map')
  t.end()
})
