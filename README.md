# reduce-promises
[![npm version](https://img.shields.io/npm/v/reduce-promises.svg)](https://npmjs.org/package/reduce-promises)
[![Build Status](https://travis-ci.org/raineorshine/reduce-promises.svg?branch=master)](https://travis-ci.org/raineorshine/reduce-promises)

Serially executes promise-returning functions and reduces the results with the given accumulator.

## Install

```sh
$ npm install --save reduce-promises
```

## Usage

```js
const { reducePromises, accumulate } = require('reduce-promises')

const functions = [
  () => Bluebird.delay(100, 'a'),
  () => Bluebird.delay(5, 'b'),
  () => Bluebird.delay(20, 'c')
]
reducePromises(functions, _.concat, []) // ['a', 'b', 'c']
```

The above concat reduction is common enough to warrant a shorthand function.

```
const functions = [
  () => Bluebird.delay(100, 'a'),
  () => Bluebird.delay(5, 'b'),
  () => Bluebird.delay(20, 'c')
]
accumulate(functions) // ['a', 'b', 'c']
```

## License

ISC © [Raine Revere](https://github.com/raineorshine)
