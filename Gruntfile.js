'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        livereload: true,
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      coffee: {
        files: ['<%= yeoman.app %>/js/**/*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/**/*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/css/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>{,*/}*.html',
          '<%= yeoman.app %>/views/**/*.html',
          '.tmp/css/**/*.css',
          '.tmp/js/**/*.js',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },

      proxies: [
        {
          context: '/localapi',
          host: 'backend',
          port: 3000,
          rewrite: {
            '^/localapi': ''
          }
        },
        {
          context: '/api',
          host: 'iquantifi.azurewebsites.net',
          port: 80,
          headers: {
            "host": "iquantifi.azurewebsites.net"
          }
        }
      ],


      livereload: {
        options: {
          open: true,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var middlewares = [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/css',
                connect.static('./app/css')
              ),
              connect.static(appConfig.app)
            ];

            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var middlewares = [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];

            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js'
        ]
      }
    },

    coffeelint: {
      app: ['<%= yeoman.app %>/js/**/*.coffee'],
      options: {
        'max_line_length': {
          'level': 'ignore'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: './**/*.css',
          dest: '.tmp/css/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: './**/*.css',
          dest: '.tmp/css/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//,
        exclude: [
          /angulartics-(?!gtm)/,
          /bootstrap-sass-official/
        ]
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes: {
          coffee: {
            block: /(([\s\t]*)#\s*?bower:\s*?(\S*))(\n|\r|.)*?(#\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi,
                coffee: /'(.*\.coffee)'/gi
              },
            replace: {
              js: '\'{{filePath}}\'',
              coffee: '\'{{filePath}}\''
            }
          }
        }
      },
      sass: {
        src: ['<%= yeoman.app %>/css/**/*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/js',
          src: '**/*.coffee',
          dest: '.tmp/js',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/css',
        cssDir: '.tmp/css',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/js',
        fontsDir: '<%= yeoman.app %>/css/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/css/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/js/{,*/}*.js',
          '<%= yeoman.dist %>/css/{,*/}*.css',
          '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/css/fonts/*',
          '<%= yeoman.dist %>/css/*.{png,jpg,jpeg,gif,webp,svg}',
          '!<%= yeoman.dist %>/images/ignore/*.{png,jpg,jpeg,gif,webp,svg}',
          '!<%= yeoman.dist %>/images/organization-logos/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.dist %>/views/**/*.html'],
      css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
      js:  ['<%= yeoman.dist %>/js/{,*/}*.js'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/css', '<%= yeoman.dist %>/images'],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      },
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'agera',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: '<%= yeoman.dist %>/js/scripts.js',
          prefix: '/'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/**/*.html',
        dest: '.tmp/js/templateCache.js'
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      },
      slick: {
        files: [{
          expand: true,
          cwd: 'bower_components/slick-carousel/slick',
          src: '*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/css'
        }]
      }
    },

    svgmin: {
      options: {
        plugins: [
          {
            convertShapeToPath: false,
          },
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/js',
          src: '*.js',
          dest: '.tmp/concat/js'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    ngconstant: {
      options: {
        name: 'config',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        dest: '<%= yeoman.app %>/js/config.js',
        constants: {
          ENV: {
            debug: true
          }
        }
      },
      dev: {
        constants: {
          ENV: {
            apiHost: '/localapi',
            fbAppId: '428246887294627'
          }
        }
      },
      devnetapi: {
        constants: {
          ENV: {
            apiHost: '/api',
            fbAppId: '428246887294627'
          }
        }
      },
      prod: {
        constants: {
          ENV: {
            debug: false,
            apiHost: 'http://iquantifi.azurewebsites.net/api',
            fbAppId: '648677845173289'
          }
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt,json}',
            '.htaccess',
            '*.html',
            'images/**/*.{webp}',
            'css/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [ 'generated/*' ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/font-awesome',
          src: ['fonts/*.*'],
          dest: '<%= yeoman.dist %>',
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/css',
        dest: '.tmp/css/',
        src: '**/*.css'
      },
      convert: {
        files: [{
          expand: true,
          cwd: '.tmp',
          dest: '<%= yeoman.dist %>',
          src: [
            'js/**/*.js',
          ]
        }, {
          expand: true,
          cwd: 'bower_components',
          dest: '<%= yeoman.dist %>/bower_components',
          src: [
            '**/*.js',
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'js/**/*.js',
            'views/**/*.html'
          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'coffee:dist',
        'compass:server'
      ],
      test: [
        'coffee',
        'compass'
      ],
      dist: [
        'coffee',
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    protractor: {
      options: {
        keepAlive: false,
        configFile: 'test/protractor.conf.js'
      },
      run: {
        configFile: 'test/protractor.conf.js',
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:dev',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('servenetapi', 'Compile then start a connect web server', function (target) {
    grunt.task.run([
      'clean:server',
      'ngconstant:devnetapi',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'ngconstant:dev',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'configureProxies',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:prod',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'ngtemplates',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:coffeelint',
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('convert', [
    'clean:dist',
    'ngconstant:prod',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'usemin',
    'copy:convert'
  ]);
};
