module.exports = function(grunt) {

  // All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          // cssmin will minify later
          style: 'expanded'
        },
        files: {
          'assets/css/build/main.css': 'assets/sass/master.scss'
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'assets/css/dist/main.min.css': ['assets/css/build/main.css']
        }
      }
    },

    jshint: {
      beforeconcat: ['assets/js/*.js']
    },

    concat: {
      dist: {
        src: [
          'assets/js/libs/jquery-1.10.2.js',
          'assets/js/scripts.js'
        ],
        dest: 'assets/js/build/main.js',
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      build: {
        src: 'assets/js/build/main.js',
        dest: 'assets/js/dist/main.min.js'
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['assets/js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['assets/sass/*.scss'],
        tasks: ['sass', 'cssmin'],
        options: {
          spawn: false,
        }
      }
    }

  });

  // Use the load-grunt-tasks plugin to load all plugins instead of loading every plugin individually.
  require('load-grunt-tasks')(grunt);

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin']);

  // Where we tell Grunt what to do when we type "grunt dev" into the terminal.
  grunt.registerTask('dev', ['watch']);

};