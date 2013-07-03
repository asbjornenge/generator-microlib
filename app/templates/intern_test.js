/**
 * <%= libname %>
 *
 *    Library test
 */

define([
  'intern!bdd',
  'intern/chai!expect',
  'lib/<%= libname %>',
], function (bdd, expect, <%= libname %>) {
  with(bdd) {

    describe('Newschool amd library', function() {
      it('Library answer questions with YO!', function() {
        var result = <%= libname %>('Should I tickle this unicorn?');
        expect(result).to.equal('YO!');
      })
    })

  }
})
