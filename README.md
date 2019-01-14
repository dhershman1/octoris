<h1 align=center>
  <a href="#" title="Octoris Repo">
    <img alt="Octoris Logo" src="https://user-images.githubusercontent.com/8997380/49382441-6a3a9280-f6e4-11e8-93b0-675e6f77112f.png">
  </a>
</h1>

<p align=center>
  <a href="https://github.com/standard/standard">
    <img alt="Standard Js" src="https://cdn.rawgit.com/standard/standard/master/badge.svg">
  </a>
</p>

This will hopefully some day soon be my envisioning of a proper functional http framework.

Check out the notes folder for markdown files containing ideas and thought processes.

## Current Phase: Early Development/Planning

This repo/project is currently in the early stages of development still. Which means there are things that may still change heavily and theory still to be discovered.

There is still concepts that needs to be proven and battle tested

## Planned

Planned functionality and features looks a little like this at the moment:

- Fully functional from the ground up, build routes with pipes/reducers/etc
- An easy to use injection method for integration testing
- A swagger like setup for open api documentation of your app
- Fast Radix Tree esk based routing
- No `magic` like strings everything runs through functions to prime it for what it needs to do
- And much more! (I will list them here as needed)

## Testing

Finally! Some POC Code is being added! Currently you can do the following (After you clone the repo and `npm i` in the directory)

All of these commands are ran with `debug` for output logging

- `npm run route` - This will give you a nice log of an example route map built by `octoris`
- `npm run core` - This will run the core of `octoris` with example route maps allows for the test of route builds
- More coming soon!

## Contribute

[Checkout the contribute file here](https://github.com/dhershman1/octoris/blob/master/.github/CONTRIBUTING.md)

Please check this file regularly as it is **Subject to change** and **updated** as the project continues to develop and grow!
