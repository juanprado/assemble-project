module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      watch: {
        html: {
          files: ['./src/pages/**/*'],
          tasks: ['html']
        },
        js: {
          files: ['<%= jshint.files %>'],
          tasks: ['js']
        },
        sass: {
          files: ['./src/sass/**/*.scss'],
          tasks: ['style']
        },
        images:  {
          files: ['./src/img/**/*'],
          tasks: ['copy']
        },
        css: {
          files: ['./dist/styles/*.css']
        },
        livereload: {
          files: ['./dist/**/*'],
          options: {livereload: true}
        }
      },
        
      concat: {
        options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
        },
        dist: {
          // the files to concatenate
          src: ['src/**/*.js'],
          // the location of the resulting JS file
          dest: './dist/js/<%= pkg.name %>.js'
        }
      },

      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: './src',
            dest: './dist',
            src: [
              'img/**'
            ]
          }]
        }
      },
        
      uglify: {
        options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: {
            './dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
          }
        }
      },

      jshint: {
        // define the files to lint
        files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
          // more options here if you want to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      },
          
      sass: {
        dist: {
          files: {
             './dist/styles/main.css': './src/sass/main.scss'
          }
        }
      },

      autoprefixer: {
        dist: {
          options: {
            browsers: ['last 2 versions', '> 1%']
          },
          files: {
            './dist/styles/main.css' : './dist/styles/main.css'
          }
        }
      },

      cssmin: {
        add_banner: {
          options: {
          banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          report: 'gzip'
          },
          files: {
            './dist/styles/main.min.css' : './dist/styles/main.css'
          }
        }
      },

      assemble: {
        options: {
          layout: './src/pages/layout/default.hbs',
          partials: './src/pages/partials/**/*.hbs',
          data: './src/pages/json/**/*.{json,yml}',
          assets: '.dist/img',
          flatten: true
        },
        pages: {
          src: './src/pages/*.hbs',
          dest: './dist/'
        }
      },
          
      connect: {
        server: {
          options: {
            port: 8000,
            base: './dist/'
          }
        }
      },
    
      clean: {
        all: ['./dist/*.html', './dist/img/**']
      },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('html', ['assemble', 'copy']);

  grunt.registerTask('js', ['jshint', 'concat', 'uglify']);

  grunt.registerTask('style', ['sass', 'autoprefixer', 'cssmin']);

  grunt.registerTask('serve', [ 'default', 'connect', 'watch']);

  grunt.registerTask('pub', ['default']);

  grunt.registerTask('default', ['js', 'style', 'copy', 'clean', 'html']);

};