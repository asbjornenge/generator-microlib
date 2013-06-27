/*global module:false*/
module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%%= pkg.title || pkg.name %> - v<%%= pkg.version %> - ' +
      '<%%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%%= grunt.template.today("yyyy") %> <%%= pkg.author.name %>;' +
      ' Licensed <%%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/{,*/}*.js'],
        dest: 'dist/<%%= pkg.name %>.v<%%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%%= banner %>'
      },
      dist: {
        src: '<%%= concat.dist.dest %>',
        dest: 'dist/<%%= pkg.name %>.v<%%= pkg.version %>.min.js'
      }
    },
    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      lib_test: {
        src: ['lib/{,*/}*.js']
      }
    },
    <%= gruntTestsConfig %>
    watch: {
      gruntfile: {
        files: '<%%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  <%= gruntTestTasks %>

  // Default task.
  grunt.registerTask('default', ['<%= gruntTestTaskName %>', 'concat', 'uglify']);

  // Specific tasks
  grunt.registerTask('test', ['<%= gruntTestTaskName %>']);
  grunt.registerTask('hint', ['jshint']);

};
