# Generator microlib

A Yeoman generator for browser microlibs.  

A microlib or micro-library is a javascript component that has a specific usecase and often a limited set of features. Great microlibraries have no dependecies and don't get in each others way.

## Why

Even if microlibs are small they can still benefit from using tools such as [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/). *generator-microlib* is a [Yeoman](http://yeoman.io/) generator that will quickly get you a suitable setup to start leveraging these tools.

Microlibs are often components within a larger project you are working on, that could benefit others. By providing a quick way to test, package and distribute components, hopefully more people will find some time to do so.

## Included

* README.md
* Grunfile.js
* bower.json
* package.json
* test scaffolding (optional)
	* QUnit for now.

## Getting started

Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`

Install the generator & create your project.

	$ npm install -g generator-microlib
	$ mkdir mylib && cd mylib
	$ yo microlib

enjoy.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
