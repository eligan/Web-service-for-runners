module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({

        clean: {
            build: ["layout/css", "layout/html", "layout/js"],
        },

        concat: {
            basic: {
              src: ['src/js/**/*.js'],
              dest: 'layout/js/main.js'
            },
            extras: {
              src: ['src/less/**/*.less'],
              dest: 'layout/css/built.less'
            }
        },

        includes: {
            files: {
                src: ['src/html/*.html'], // Source files
                dest: 'layout/html', // Destination directory
                flatten: true,
                options: {
                    flatten: true,
                    includePath: 'src/html-parts'
                }
            }
        },

        less: {
            development: {
                files: {
                    'layout/css/result.css' : ['layout/css/built.less', 'layout/css/sprites.less']
                }
            }
        },

        sprite:{
            all: {
                src: 'src/icons-for-sprite/*.png',
                dest: 'images/sprite.png',
                destCss: 'layout/css/sprite.css'
            }
        },

        watch: {
            scripts: {
                files: ['src/*/*.js', 'src/*/*.html', 'src/*/*/*.less'],
                tasks: ['clean', 'sprite', 'concat', 'less', 'includes'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['clean', 'sprite', 'concat', 'less', 'includes', 'watch']);

};