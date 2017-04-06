const chai = require('chai')
const reducePromises = require('../index.js')
const should = chai.should()

describe('reduce-promises', () => {
  it('should do something', () => {
    reducePromises().should.equal(12345)
  })
})
