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
          files: ['./src/assets/sass/**/*.scss'],
          tasks: ['style']
        },
        images:  {
          files: ['./src/assets/**/*'],
          tasks: ['copy', 'clean:assets']
        },
        css: {
          files: ['./dist/assets/*.css']
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
          src: ['src/assets/**/*.js'],
          // the location of the resulting JS file
          dest: './dist/assets/<%= pkg.name %>.js'
        }
      },

      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: './src/',
            dest: './dist/',
            src: [
              'assets/**',
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
            './dist/assets/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
          }
        }
      },

      jshint: {
        // define the files to lint
        files: ['gruntfile.js', 'src/assets/js/js.js'],
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
             './dist/assets/main.css': './src/assets/sass/main.scss'
          }
        }
      },

      autoprefixer: {
        dist: {
          options: {
            browsers: ['last 2 versions', '> 1%']
          },
          files: {
            './dist/assets/main.css' : './dist/assets/main.css'
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
            './dist/assets/main.min.css' : './dist/assets/main.css'
          }
        }
      },

      assemble: {
        options: {
          layout: 'default.hbs',
          layoutdir: './src/pages/layout',
          partials: './src/pages/partials/**/*.hbs',
          flatten: true
        },
        pages: {
          src: './src/pages/*.hbs',
          dest: './dist/'
        },
        collection: {
          src: './src/pages/collection/*.hbs',
          dest: './dist/collection/'
        },
        about: {
          src: './src/pages/about/*.hbs',
          dest: './dist/about/'
        },
        contact: {
          src: './src/pages/contact/*.hbs',
          dest: './dist/contact/'
        },
        customer: {
          src: './src/pages/customer/*.hbs',
          dest: './dist/customer/'
        },
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
        all: ['./dist/*.html', './dist/assets/**'],
        assets: ['./dist/assets/sass/**', './dist/assets/js/**'],
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

  grunt.registerTask('html', ['assemble']);

  grunt.registerTask('js', ['jshint', 'concat', 'uglify']);

  grunt.registerTask('style', ['sass', 'autoprefixer', 'cssmin']);

  grunt.registerTask('serve', [ 'default', 'connect', 'watch']);

  grunt.registerTask('pub', ['default']);

  grunt.registerTask('default', ['clean:all', 'js', 'style', 'copy', 'clean:assets', 'html']);

};