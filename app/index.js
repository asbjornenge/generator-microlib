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
      message: 'What is your flavor in testing tools?'.bold.green,
      type : 'list',
      choices : [
        { name : 'QUnit',      value : 'qunit' },
        { name : 'The Intern', value : 'intern' }
      ],
      default : 'intern'
    }
  ];

  this.prompt(prompts, function (props) {

    this.libname      = props.libname.replace(/\s+/g, '');
    this.includeTests = props.includeTests;

    cb();
  }.bind(this));

};

MicrolibGenerator.prototype.app = function app() {
  this.mkdir('lib');
  this.mkdir('dist');

  this.username = "username";
  if (process.env != undefined && process.env['USER'] != undefined)
    this.username = process.env['USER'];

  this.gruntTestsConfig  = "";
  this.gruntTestTasks    = "";
  this.gruntTestTaskName = "";
  this.devDepsBower      = "";
  this.devDepsNpm       =
    '"grunt": "~0.4.1",'+
    '\n    "grunt-contrib-jshint" : "~0.6.0",'+
    '\n    "grunt-contrib-uglify" : "~0.2.2",'+
    '\n    "grunt-contrib-concat" : "~0.3.0",'+
    '\n    "grunt-contrib-watch"  : "~0.4.4",'+
    '\n    "matchdep"             : "~0.1.2"';

  switch(this.includeTests) {
    case 'qunit':
      this.mkdir('tests');
      this.template('qunit.html',    'tests/test.html');
      this.template('qunit_test.js', 'tests/test.js');
      this.devDepsNpm  +=
        ',\n    "grunt-contrib-qunit"    : "~0.2.2"';
      this.devDepsBower =
        '"qunit": "~1.11.0"'
      this.gruntTestsConfig =
        "qunit: {"+
        "\n        files: ['tests/test.html']"+
        "\n    },";
      this.gruntTestTaskName = "qunit";
      break;
    default:
      this.mkdir('tests');
      this.template('intern.js',      'tests/intern.js');
      this.template('intern_test.js', 'tests/test.js');
      this.devDepsNpm  +=
        ',\n    "intern" : "~1.1.0"';
      this.gruntTestsConfig =
        "intern: {"+
        "\n      library: {"+
        "\n        options: {"+
        "\n          // for other available options, see:"+
        "\n          // https://github.com/theintern/intern/wiki/Using-Intern-with-Grunt#task-options"+
        "\n          config: 'tests/intern'"+
        "\n        }"+
        "\n      }"+
        "\n    },"
      this.gruntTestTasks = "grunt.loadNpmTasks('intern');";
      this.gruntTestTaskName = "intern";
      break;
  }

  this.template('Gruntfile.js',  'Gruntfile.js');
  this.template('README.md',     'README.md');
  this.template('library.js',    'lib/'+this.libname+'.js');
  this.template('package.json',  'package.json');
  this.template('bower.json',    'bower.json');
};

MicrolibGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc',     '.jshintrc');
  this.copy('gitignore',    '.gitignore');
  this.copy('travis.yml',   '.travis.yml');
};
