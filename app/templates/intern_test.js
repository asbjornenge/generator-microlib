/**
 * <%= libname %>
 *
 *    Library test
 */

define([
  'intern!bdd',
  'intern/chai!expect',
  'lib/<%= libname %>_amd',
  'intern/order!lib/<%= libname %>.js'
], function (bdd, expect, <%= libname %>_amd) {
  with(bdd) {

    describe('Oldschool browser library', function() {
      it('Library answer questions with YO!', function() {
        var result = <%= libname %>('Should I tickle this unicorn?');
        expect(result).to.equal('YO!');
      })
    })

    describe('Newschool amd library', function() {
      it('Library answer questions with YO!', function() {
        var result = <%= libname %>_amd('Should I tickle this unicorn?');
        expect(result).to.equal('YO!');
      })
    })

  }
})
