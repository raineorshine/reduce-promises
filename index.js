const waterfall = require('promise.waterfall')
const Bluebird = require('bluebird')
const _ = require('lodash')

/** Executes an array of promises or promise-returning functions serially and reduces thes results with the given accumulator */
function reducePromises(functionsOrPromises, accumulator, start) {
  return waterfall(functionsOrPromises.map((o, i) => {
    const f = typeof o === 'function' ? o : () => o
    return acc => f().then(result => accumulator(i === 0 ? start : acc, result))
  }))
}

/** Executes an array of promises or promise-returning functions serially and returns an array of the results. */
function accumulate(functions) {
  return reducePromises(functions, _.concat, [])
}

module.exports = {
  reducePromises,
  accumulate
}
