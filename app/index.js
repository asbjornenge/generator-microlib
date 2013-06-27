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
  '\n    |' + '--(µ)--'.red + '|   .---------------------------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman ladies and gentlemen,'.yellow.bold+'  |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'lets make a library! Ooh, that tickles. '.yellow.bold + '  |' +
  '\n    /___A___\\   \'_____________________________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  // dirname
  var splitPath = process.cwd().split('/');
  var dirname   = splitPath[splitPath.length-1];

  console.log(welcome);

  var prompts = [
    {
      name : 'libname',
      message : 'What is the name of your library?'.bold.green,
      default : dirname,
      warning : 'a warning'
    },
    {
      name: 'includeTests',
      message: 'What is your flavor in testing tools?'.bold.green+
               '\nQUnit      :'+' qunit'.bold.yellow +
               '\nThe Intern :'+' intern'.bold.yellow +
               '\n[MORE COMING]' +
               '\n......................',
      default : 'intern'
    }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.libname      = props.libname;//(/^\S*$/i).test(props.libname);
    this.includeTests = props.includeTests;

    cb();
  }.bind(this));
};

MicrolibGenerator.prototype.app = function app() {
  this.mkdir('lib');
  this.mkdir('dist');

  this.template('_README.md',    'README.md');
  this.copy('_LICENSE.md',   'LICENSE.md');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_library.js',   'lib/'+this.libname+'.js');

  this.devDepsNpm = ''+
    '"grunt": "~0.4.1",'+
    '\n    "grunt-contrib-jshint": "~0.1.1",'+
    '\n    "grunt-contrib-nodeunit": "~0.1.2",'+
    '\n    "grunt-contrib-uglify": "~0.2.0",'+
    '\n    "grunt-contrib-concat": "~0.3.0",'+
    '\n    "grunt-contrib-watch": "~0.3.1"';
  this.devDepsBower = ''

  switch(this.includeTests) {
    case 'intern':
      this.mkdir('tests');
      this.copy('intern.js','tests/intern.js');
      this.copy('intern_all.js','tests/all.js');
      this.devDepsNpm  +=
        ',\n    "intern": "~1.1.0"';
      break;
    case 'qunit':
      this.mkdir('tests');
      this.copy('_qunit.html', 'tests/test.html');
      this.copy('_qunit.js',   'tests/test.js');
      this.devDepsNpm  =
        ',\n    "grunt-contrib-qunit": "~0.2.1"';
      this.devDepsBower =
        '"qunit": "~1.11.0"'
      break;
  }

  this.template('_package.json', 'package.json');
  this.template('_bower.json',   'bower.json');
};

MicrolibGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
};
