const test = require('tape')
const methods = require('../lib/methods')

test('CONNECT(handler, middleware) No Middleware', t => {
  const results = methods.CONNECT(() => true)

  t.same(results instanceof Map, true, 'Is a map')
  t.same(typeof results.get('CONNECT').fn, 'function', 'Handler is a function')
  t.same(results.get('CONNECT').middleware, [], 'No middleware added to method')
  t.end()
})

test('CONNECT(hanlder, middleware) with Middleware', t => {
  const results = methods.CONNECT(() => true, [() => false])

  t.same(results instanceof Map, true, 'It is a map')
  t.same(typeof results.get('CONNECT').fn, 'function', 'Handler is a function')
  t.same(results.get('CONNECT').middleware.length, 1, 'Has middleware array')
  t.end()
})

test('DELETE(handler, middleware) No Middleware', t => {
  const results = methods.DELETE(() => true)

  t.same(results instanceof Map, true, 'Is a map')
  t.same(typeof results.get('DELETE').fn, 'function', 'Handler is a function')
  t.same(results.get('DELETE').middleware, [], 'No middleware added to method')
  t.end()
})

test('DELETE(hanlder, middleware) with Middleware', t => {
  const results = methods.DELETE(() => true, [() => false])

  t.same(results instanceof Map, true, 'It is a map')
  t.same(typeof results.get('DELETE').fn, 'function', 'Handler is a function')
  t.same(results.get('DELETE').middleware.length, 1, 'Has middleware array')
  t.end()
})

test('HEAD(handler, middleware) No Middleware', t => {
  const results = methods.HEAD(() => true)

  t.same(results instanceof Map, true, 'Is a map')
  t.same(typeof results.get('HEAD').fn, 'function', 'Handler is a function')
  t.same(results.get('HEAD').middleware, [], 'No middleware added to method')
  t.end()
})

test('HEAD(hanlder, middleware) with Middleware', t => {
  const results = methods.HEAD(() => true, [() => false])

  t.same(results instanceof Map, true, 'It is a map')
  t.same(typeof results.get('HEAD').fn, 'function', 'Handler is a function')
  t.same(results.get('HEAD').middleware.length, 1, 'Has middleware array')
  t.end()
})

test('OPTIONS(handler, middleware) No Middleware', t => {
  const results = methods.OPTIONS(() => true)

  t.same(results instanceof Map, true, 'Is a map')
  t.same(typeof results.get('OPTIONS').fn, 'function', 'Handler is a function')
  t.same(results.get('OPTIONS').middleware, [], 'No middleware added to method')
  t.end()
})

test('OPTIONS(hanlder, middleware) with Middleware', t => {
  const results = methods.OPTIONS(() => true, [() => false])

  t.same(results instanceof Map, true, 'It is a map')
  t.same(typeof results.get('OPTIONS').fn, 'function', 'Handler is a function')
  t.same(results.get('OPTIONS').middleware.length, 1, 'Has middleware array')
  t.end()
})

test('PATCH(handler, middleware) No Middleware', t => {
  const results = methods.PATCH(() => true)

  t.same(results instanceof Map, true, 'Is a map')
  t.same(typeof results.get('PATCH').fn, 'function', 'Handler is a function')
  t.same(results.get('PATCH').middleware, [], 'No middleware added to method')
  t.end()
})

test('PATCH(hanlder, middleware) with Middleware', t => {
  const results = methods.PATCH(() => true, [() => false])

  t.same(results instanceof Map, true, 'It is a map')
  t.same(typeof results.get('PATCH').fn, 'function', 'Handler is a function')
  t.same(results.get('PATCH').middleware.length, 1, 'Has middleware array')
  t.end()
})

test('POST(handler, middleware) No Middleware', t => {
  const results = methods.POST(() => true)

  t.same(results instanceof Map, true, 'Is a map')
  t.same(typeof results.get('POST').fn, 'function', 'Handler is a function')
  t.same(results.get('POST').middleware, [], 'No middleware added to method')
  t.end()
})

test('POST(hanlder, middleware) with Middleware', t => {
  const results = methods.POST(() => true, [() => false])

  t.same(results instanceof Map, true, 'It is a map')
  t.same(typeof results.get('POST').fn, 'function', 'Handler is a function')
  t.same(results.get('POST').middleware.length, 1, 'Has middleware array')
  t.end()
})

test('PUT(handler, middleware) No Middleware', t => {
  const results = methods.PUT(() => true)

  t.same(results instanceof Map, true, 'Is a map')
  t.same(typeof results.get('PUT').fn, 'function', 'Handler is a function')
  t.same(results.get('PUT').middleware, [], 'No middleware added to method')
  t.end()
})

test('PUT(hanlder, middleware) with Middleware', t => {
  const results = methods.PUT(() => true, [() => false])

  t.same(results instanceof Map, true, 'It is a map')
  t.same(typeof results.get('PUT').fn, 'function', 'Handler is a function')
  t.same(results.get('PUT').middleware.length, 1, 'Has middleware array')
  t.end()
})

test('TRACE(handler, middleware) No Middleware', t => {
  const results = methods.TRACE(() => true)

  t.same(results instanceof Map, true, 'Is a map')
  t.same(typeof results.get('TRACE').fn, 'function', 'Handler is a function')
  t.same(results.get('TRACE').middleware, [], 'No middleware added to method')
  t.end()
})

test('TRACE(hanlder, middleware) with Middleware', t => {
  const results = methods.TRACE(() => true, [() => false])

  t.same(results instanceof Map, true, 'It is a map')
  t.same(typeof results.get('TRACE').fn, 'function', 'Handler is a function')
  t.same(results.get('TRACE').middleware.length, 1, 'Has middleware array')
  t.end()
})
