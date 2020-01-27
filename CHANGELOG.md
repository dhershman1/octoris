# Octoris Changelog

## v0.4.1

### New

- Documentation site is up on gitbooks, fixed all links to point there

## v0.4.0

### New

- Documentation site is up on gitbooks, fixed all links to point there
- `debug` is now part of the main root API
    - Documentation to follow shortly

### Improved

- Fixed the handleRoute promise chain so properly works as a chain instead of nesting
- Improved how the logger functionality is working
- npm ignore blocks unneeded files from getting packed into the npm package

## v0.3.1

### New

- Added new badges to the README
- You can now have catch alls at different layers of routing, instead of only being used at the root level

### Fixed

- You can now send a `pino` options object to the logger option and it will register accordingly

### Improved

- Lots of unit test additions and improvements

## v0.3.0

### New

- You can now apply fixed routes by either using the `fixed` function or just a `string`

### Improved

- Middleware doesn't need to return a promise anymore for non async actions
- Routes that aren't using async tools (such as fs) can just return a `response` method
- Updated Kyanite to v1.1.0


## v0.2.0

### BREAKING

- Removed built in static middleware, you can now get this middleware from @octoris/static

## v0.1.1

- Readme patch

## v0.1.0

- Initial Release
