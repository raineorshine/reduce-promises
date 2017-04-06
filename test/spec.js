const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const should = chai.should()
const Bluebird = require('bluebird')
const _ = require('lodash')
const reducePromises = require('../index.js')

describe('reduce-promises', () => {

  it('reduce the results of a sequence of promise-returning functions', function() {
    this.timeout(5000)

    // a counter to test the order of promise resolution
    let counter = 0
    function count(x) {
      counter++
      return x
    }

    // an array of 10ms functions with different return values
    const functions = [
      // ensure promises are executed serially
      () => Bluebird.delay(100, 'a').then(count),
      () => counter !== 1 ? Bluebird.reject(new Error('Promise out of order')) : Bluebird.delay(5, 'b').then(count),
      () => counter !== 2 ? Bluebird.reject(new Error('Promise out of order')) : Bluebird.delay(20, 'c').then(count)
    ]

    return reducePromises.reducePromises(functions, _.concat, [])
      .should.eventually.deep.equals(['a', 'b', 'c'])
  })

  it('accumulate the results of a sequence of promise-returning functions', () => {

    // an array of 10ms functions with different return values
    const functions = [
      () => Bluebird.delay(100, 'a'),
      () => Bluebird.delay(5, 'b'),
      () => Bluebird.delay(20, 'c')
    ]
    return reducePromises.accumulate(functions).should.eventually.deep.equals(['a', 'b', 'c'])
  })
})
