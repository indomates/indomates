module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd h:MM") %> */\n',
    
    //clean the output folder and unused css files
    clean: {
      output : {
        src: ["public/dist"]
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      build: {
        src: 'public/dist/js/bootcards.js',
        dest: 'public/dist/js/bootcards.min.js'
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          src: ['*.scss'],
          dest: 'public/dist/css',
          ext: '.css',
          flatten: true
        }]
      }
    },

    cssmin: {
      minify : {
        options: { banner: '<%= banner %>' },
        files: [{
          expand: true,
          cwd: 'public/dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'public/dist/css/',
          ext: '.min.css'
        }]
      }
    },

     watch : {
      scripts: {
        files: ['**/*.js', '**/*.scss'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      }
    }

  });

  //load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', [
    'clean:output',
    'uglify',
    'sass',
    'cssmin:minify'
    ]);
};