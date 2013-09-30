# Generator microlib

[![Build Status](https://secure.travis-ci.org/asbjornenge/generator-microlib.png?branch=master)](http://travis-ci.org/asbjornenge/generator-microlib)

A Yeoman generator for browser microlibs.

A microlib or micro-library is a javascript component that has a specific usecase and often a limited set of features. Great microlibraries have no dependecies and don't get in each others way.

## Why

Even if microlibs are small they can still benefit from using tools such as [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/). *generator-microlib* is a [Yeoman](http://yeoman.io/) generator that will quickly get you a suitable setup to start leveraging these tools.

Microlibs are often components within a larger project you are working on, that could benefit others. By providing a quick way to test, package and distribute components, hopefully more people will find some time to do so.

## Included

The generator provides the following files.

	|- mylib
	   |- .editorconfig  // Example .editorconfig (http://editorconfig.org/)
	   |- .gitignore     // Basic .gitignore
	   |- .jshintrc      // Example JSHint configuration (http://www.jshint.com/docs/)
	   |- .travis.yml    // Example Travis configuration (http://www.travis-ci.org/)
	   |- Grunfile.js    // Basic Grunt configuration
	   |- README.md      // Empty README file
	   |- bower.json     // Basic Bower configuration
	   |- package.json   // Basic Npm configuration
	   |- dist           // Folder for your distributables
          |- <lib>.min.js
	   |- lib            // Folder for your library !!
          |- <lib>.js
	   |- tests          // Folder for your tests
          |- <test>.js

The generator provides the following grunt tasks.

	jshint concat uglify [qunit/intern]

	$ grunt hint // will run jshint
	$ grunt test // will run qunit/intern
	$ grunt      // will run test, concat, uglify

## Getting started

Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`

Install the generator & create your project.

	$ npm install -g generator-microlib
	$ mkdir mylib && cd mylib
	$ yo microlib
	$ grunt

enjoy.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Changelog

### 0.2.2

* Added mocha support (grunt-mocha-test)
* Added .bowerrc
* Updated qunit & intern packages
* Renamed tests folder & test.js file
	* ./tests -> ./test 
	* test.js -> spec.js

#### Notes

QUnit now expects an up-to-date bower version. Or rather; QUnit's *test/test.html* references qunit from a *bower_components* dir in project root. The included .bowerrc should automatically fix this.


### 0.2.1

* A few fixes to support latest yeoman-generator & yo

### 0.2.0

* Updated yeoman-generator dependency to leverage [Inquirer](https://github.com/SBoudrias/Inquirer.js) for list prompts
	* (Two updates in one day? Weee…!)
	* (Note to self: Read up on semver :-P)

### 0.1.5

* Library example is now browser & amd compatible by default.

### 0.1.4

* Templating out library name
* Supporting multiple test frameworks
	* [Qunit](http://qunitjs.com/)
	* [The Intern](http://theintern.io)
		* Usnig this will also dump an amd example module & test.
* Actually using .jshintrc
* Moved hinting into separate grunt task
* Added .travis.yml & build status link to README.md
* Updated versions
* General cleanup

### Pre 0.1.4

Had no changelog, can't remember. Stuff happened.
