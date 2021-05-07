module.exports = function(grunt) {
    const sass = require('node-sass');



    grunt.initConfig({
        watch: {
            partials: {
                files: ['src/sass/*', 'src/layouts/*','src/layouts/test/*', 'src/non-dist-partials/*', 'src/includes/*','src/includes/test/*'],
                tasks: ['sass', 'stripCssComments', 'lineremover', 'cmq', 'assemble', 'copy', 'clean']
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
                dest: './dist/test/',
                ext: 'html'
            }
            layouts: {
                src: ['src/layouts/*.html'],
                dest: './dist/layouts/',
                ext: 'html'
            },
            test_layouts: {
                src: ['src/layouts/test/*.html'],
                dest: './dist/test/',
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
            default:{
                files: [{
                expand: true,
                flatten: true,
                src: ['src/images/*'],
                dest: 'dist/images/',
                filter: 'isFile'
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
            yourTarget: {
                src: ["dist/dw/*.html"]
            }
        }
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

    grunt.registerTask('default', ['watch']);
    // The default task to run with the `grunt` command.
    // grunt.registerTask('default', ['assemble']);
};