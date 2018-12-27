# Validation & Serialization

I would like to provide some form of payload validation to the user of some kind. Similar to how [Fastify does it here](https://github.com/fastify/fastify/blob/master/docs/Validation-and-Serialization.md)

This would allow for us to do sending and recieving validation too!

Here's some ideas on how we can implement it:

- Building a JSON Schema Validation API
- Using a Module like [AJV](https://www.npmjs.com/package/ajv) for blazing fast json validation
  - This is probably the route I am leaning
  - Similar to logging we may need to build an API around it
  - Also similar to logging we may just be able to provide direct access to functions

I will post more theory on how to accomplish this later.
