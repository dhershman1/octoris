const test = require('tape')
const tree = require('../lib/router/tree')
const { fixed, param, route, all } = require('../lib/router')
const { GET } = require('../lib/methods')

test('tree() a current size of 2 tree', t => {
  const home = fixed('home')
  const tmp = fixed('tmp')
  const results = tree.tree(home, new Map([...tmp]))

  t.same(results.get('home'), home, 'The home map was saved to our tree as a branch')
  t.same(results.get('home').get('type'), 'static', 'The home map is a type static')
  t.end()
})

test('tree() current size of 1', t => {
  const tmp = new Map([['foo', fixed('foo')]])
  const home = fixed('home')
  const results = tree.tree(home, tmp)

  t.same(results.get('foo').get('home'), home, 'The home map was saved as a branch of foo')
  t.same(results.get('foo').get('home').get('type'), 'static', 'The home map is a type static')
  t.end()
})

test('tree() current size of 3', t => {
  const tmp = new Map([['foo', fixed('foo')], ['bar', fixed('bar')], ['baz', fixed('baz')]])
  const home = fixed('home')
  const results = tree.tree(home, tmp)

  t.same(results.get('baz').get('home'), home, 'The home map was saved as a branch of baz')
  t.same(results.get('baz').get('home').get('type'), 'static', 'The home map is a type static')
  t.end()
})

test('searchTree() Root level', t => {
  const home = fixed('/')
  home.set('methods', () => {})
  const treeMap = tree.tree(home, new Map())
  const results = tree.searchTree(treeMap, '/')

  t.same(results.get('name'), '/', 'The name of the found map matches')
  t.same(results.get('type'), 'static', 'The type of the found map is static')
  t.end()
})

test('searchTree() searching for nested branches', t => {
  const home = fixed('bar')
  const tmp = new Map([['foo', fixed('foo')]])
  home.set('methods', () => { })
  const treeMap = tree.tree(home, tmp)
  const results = tree.searchTree(treeMap, '/foo/bar')

  t.same(results.get('name'), 'bar', 'The name of the found map matches')
  t.same(results.get('type'), 'static', 'The type of the found map is static')
  t.end()
})

test('searchTree() searching with params', t => {
  const r = route(['foo', param('bar')], [GET(() => {})])
  const results = tree.searchTree(r, '/foo/test123')

  t.same(results.get('type'), 'param', 'The type of our found map is a param')
  t.same(results.get('params'), { bar: 'test123' }, 'Param value was set to an object in the params key')
  t.end()
})

test('searchTree() searching with multi-level params', t => {
  const r = route(['foo', param('bar'), param('baz')], [GET(() => { })])
  const results = tree.searchTree(r, '/foo/test123/anotherone')

  t.same(results.get('type'), 'param', 'The type of our found map is a param')
  t.same(results.get('params'), { bar: 'test123', baz: 'anotherone' }, 'Param value was set to an object in the params key')
  t.end()
})

test('searchTree() searching fallback to all', t => {
  const r = route([all()], [GET(() => { })])
  const results = tree.searchTree(r, '/foo')

  t.same(results.get('name'), 'all', 'The name is a catch all')
  t.same(results.get('type'), 'catch-all', 'It is a catch all type')
  t.end()
})
