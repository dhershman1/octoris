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

test('response.redirect(url, data)', t => {
  const resObj = generateResponse(data => {
    t.same(data, 'redirect')
    t.same(resObj.code, 302)
    t.end()
  })

  response.redirect('google.com', 'redirect').then(fn => fn({ response: resObj, request: {} }))
})

test('response.send(code, data)', t => {
  const resObj = generateResponse(data => {
    t.same(data, 'google.com')
    t.same(resObj.code, 200)
    t.end()
  })

  response.send(200, 'google.com').then(fn => fn({ response: resObj, request: {} }))
})
