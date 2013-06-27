/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('microlib generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('microlib:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      'bower.json',
      'package.json',
      'Gruntfile.js',
      'README.md',
      'lib/yolo.js'
    ];

    helpers.mockPrompt(this.app, {
      'libname'     : 'yolo',
      'includeTests': 'intern'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
