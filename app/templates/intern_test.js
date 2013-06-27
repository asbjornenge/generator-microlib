/**
 * <%= libname %>
 *
 *    Library test
 */

define([
  'intern!bdd',
  'intern/chai!expect',
  'lib/<%= libname %>'
], function (bdd, expect, <%= libname %>) {
  with(bdd) {

      describe('Library answer questions with YO!', function() {
        it('should be an object', function() {
          var result = <%= libname %>('Should I tickle this unicorn?');
          expect(resutl).to.equal('YO!');
        })

    })
  }
})
