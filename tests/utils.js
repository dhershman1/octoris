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

  t.same(utils.findInMap(x => x > 2, data), 3)
  t.end()
})
