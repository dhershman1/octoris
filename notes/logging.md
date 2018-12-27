# Logging

Another point of conversation is how do we want to handle Logging? Do we build a simple Logging API to use?

Our options are:

- Build a Log API the user can use
- Use something like [Pino](https://www.npmjs.com/package/pino)
  - This may require us to build an api over top of it to use it within octoris anyway
  - We may also be able to simply provide functions directly from pino to the user (similar to how kyanite is being provided)

I will post more theory on how to accomplish this later.
