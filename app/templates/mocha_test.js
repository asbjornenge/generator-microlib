/**
 * <%= libname %>
 *
 *    Library test
 */

'use strict'

var assert = require('assert'),
lib        = require('../lib/<%= libname %>');

describe('Basic library test', function() {
  it('should answer all questions with YO!', function() {
    var answer = lib.<%= libname %>('Should I tickle this unicorn?');
    assert.equal(answer,'YO!');
  })
})
