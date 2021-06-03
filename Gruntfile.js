module.exports = function(grunt) {
    const sass = require('node-sass');



    grunt.initConfig({
        watch: {
            partials: {
                files: ['src/css/*', 'src/sass/*', 'src/layouts/*','src/layouts/test/*', 'src/non-dist-partials/*', 'src/includes/*','src/includes/test/*'],
                tasks: ['clean:dist','sass', 'stripCssComments', 'lineremover', 'cmq', 'assemble', 'copy', 'clean:dw', 'insert_timestamp']
            },
        },
        sass: {
            dist: {
                options: {
                    implementation: sass,
                    outputStyle: 'nested',
                    sourceComments: false
                },
                files: {
                    'src/css/main-style.css': 'src/sass/main-style.scss',
                }
            }
        },
        stripCssComments: {
            dist: {
                files: {
                    'src/css/main-style.css': 'src/css/main-style.css'
                }
            }
        },
        cmq: {
            options: {
                log: true
            },
            css: {
                files: {
                    'src/css/main-style.css': 'src/css/main-style.css'
                }
            }
        },
        lineremover: {
            noOptions: {
                files: {
                    'src/css/main-style.css': 'src/css/main-style.css'
                }
            },
        },
        assemble: {
            options: {
                flatten: true,
                layouts: ['src/layouts/*.html'],
                partials: ['src/**/*.hbs', 'src/css/*.css'],
            },
            snippets: {
                options: {
                    layout: 'module-wrapper.hbs',
                    layoutdir: 'src/non-dist-partials/'
                },
                src: ['src/includes/*.hbs'],
                dest: './dist/modules/',
                ext: 'html'
            },
            test_snippets: {
                src: ['src/includes/test/*.hbs'],
                dest: './test/modules/',
                ext: 'html'
            },
            layouts: {
                src: ['src/layouts/*.html'],
                dest: './dist/layouts/',
                ext: 'html',
                options: {
                    partials:['dist/modules/*.html']
                }
            },
            test_layouts: {
                src: ['src/layouts/test/*.html'],
                dest: './test/layouts/',
                ext: 'html'
            },
            dw: {
                options: {
                    layout: 'dw-wrapper.hbs',
                    layoutdir: 'src/non-dist-partials/',
                },
                src: ['dist/modules/*.html'],
                dest: './dist/dw/',
            }

        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/images/*'],
                    dest: 'dist/images'
                }, ],
            },
            dw: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dist/dw/**.html'],
                    dest: 'dist/dw/',
                    filter: 'isFile',
                    rename: function(dest, src) { return dest + src.replace('.html', '.csn'); }
                }, ],
            },
        },
        clean: {
            dw: {
                src: ["dist/dw/*.html"]
            },
            dist: {
                src: ["dist"]
            }
        },
        insert_timestamp: {
            // Sample usage with css files
            layouts: {
              options: {
                prepend: true,
                append: false,
                format: 'mmmm dd, yyyy',
                template: '<!-- ! Template compiled on: {timestamp} -->',
                datetime: new Date(),
                insertNewlines: true
              },
              files: [{
                // Use dynamic extend name
                expand: true,
                cwd: 'dist/layouts',
                // Match files
                src: ['*.html'],
                // Output files
                dest: 'dist/layouts',
                ext: '.html'
              }]
            }
          },
          compress: {
            main: {
              options: {
                archive: 'Prudential Email Code System.zip'
              },
              files: [
                {src: ['dist/**'], dest: '/'}, // includes files in path and its subdirs
              ]
            }
          },

    });

    // Load the Assemble plugin.
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-strip-css-comments');
    grunt.loadNpmTasks('grunt-line-remover');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-insert-timestamp');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('test', ['watch']);
    grunt.registerTask('default',['clean:dist','sass', 'stripCssComments', 'lineremover', 'cmq', 'assemble', 'copy', 'clean:dw', 'insert_timestamp']);
    grunt.registerTask('deploy', ['compress']);
    // The default task to run with the `grunt` command.
};