# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.3](https://github.com/dhershman1/octoris/compare/v0.4.3...v0.4.4) (2020-04-06)

* Fixed security vulnerabilities in dev deps

### [0.4.3](https://github.com/dhershman1/octoris/compare/v0.4.0...v0.4.3) (2020-01-29)


### Features

* **commitizen:** converting to the commitizen tool ([a5492c5](https://github.com/dhershman1/octoris/commit/a5492c5c16533e3d77ebbc48aa0b4180d6e72846))

## v0.4.2

### New

- Added multipart to middleware list
- Removed warning from README as Octoris is now on a stable release cycle (not 1.0 yet however)
- Removed unused internals

## v0.4.1

### New

- Documentation site is up on gitbooks, fixed all links to point there
- `debug` is now part of the main root API
    - Documentation to follow shortly

## v0.4.0

### New

- Added the ability to set a file path to have logs from the logger written

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
