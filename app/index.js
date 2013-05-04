'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MicrolibGenerator = module.exports = function MicrolibGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MicrolibGenerator, yeoman.generators.NamedBase);

MicrolibGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(µ)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);

  var prompts = [{
    name: 'includeTests',
    message: 'Would you like to include some test scaffolding?',
    default: 'Y/n',
    warning: 'Yes: You know you should!'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.includeTests = (/y/i).test(props.includeTests);

    cb();
  }.bind(this));
};

MicrolibGenerator.prototype.app = function app() {
  this.mkdir('lib');
  this.mkdir('dist');

  this.copy('_README.md', 'README.md');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_library.js', 'lib/yeoball.js');
  if (this.includeTests) {
    this.mkdir('test');
    this.copy('_qunit.html','test/test.html');
    this.copy('_qunit.js','test/test.js');
  }
};

MicrolibGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
};
