const test = require('tape')
const response = require('../lib/response')

function generateResponse (fn) {
  return {
    code: 0,
    writeHead (code) {
      this.code = code
      return true
    },
    end: fn
  }
}

test('response.json(code, data)', t => {
  const resObj = generateResponse(data => {
    t.same(data, { a: 1 })
    t.same(resObj.code, 200)
    t.end()
  })

  response.json(200, { a: 1 }).then(fn => fn(({ response: resObj })))
})

test('response.json() Throws error with bad code', t => {
  const resObj = generateResponse(() => {})

  try {
    response.json([], { a: 1 })
      .then(fn => fn(({ response: resObj })))
  } catch (err) {
    t.same(err.message, 'Code must be provided and it must be a string or number')
    t.end()
  }
})

test('response.redirect(url, data)', t => {
  const resObj = generateResponse(data => {
    t.same(data, 'redirect')
    t.same(resObj.code, 302)
    t.end()
  })

  response.redirect('google.com', 'redirect').then(fn => fn({ response: resObj, request: {} }))
})

test('response.redirect() Immediate response if method is HEAD', t => {
  const resObj = generateResponse((data) => {
    t.same(data, undefined, 'No data returned for HEAD method')
    t.end()
  })

  response.redirect('google.com', 'redirect').then(fn => fn({ response: resObj, request: { method: 'HEAD' } }))
})

test('response.send(code, data)', t => {
  const resObj = generateResponse(data => {
    t.same(data, 'google.com')
    t.same(resObj.code, 200)
    t.end()
  })

  response.send(200, 'google.com').then(fn => fn({ response: resObj, request: {} }))
})

test('response.send() Throws error with bad code', t => {
  const resObj = generateResponse(() => { })

  try {
    response.send([], { a: 1 })
      .then(fn => fn(({ response: resObj })))
  } catch (err) {
    t.same(err.message, 'Code must be provided and it must be a string or number')
    t.end()
  }
})

test('response.send() Immediate response if method is HEAD', t => {
  const resObj = generateResponse((data) => {
    t.same(data, undefined, 'No data returned for HEAD method')
    t.end()
  })

  response.send(200, 'redirect').then(fn => fn({ response: resObj, request: { method: 'HEAD' } }))
})
