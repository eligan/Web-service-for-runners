module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({

        clean: {
            build: ["main_part/dest/css", "main_part/dest/html", "main_part/dest/js",
                    "runner_part/dest/css", "runner_part/dest/html", "runner_part/dest/js",
                    "organizer_part/dest/css", "organizer_part/dest/html", "organizer_part/dest/js"],
        },

        concat: {
            basic_and_extras: {
                files: {
                    'main_part/dest/js/main.js': ['main_part/src/js/**/*.js', 'common_part/js/**/*.js'],
                    'runner_part/dest/js/main.js': ['runner_part/src/js/**/*.js', 'common_part/js/**/*.js'],
                    'organizer_part/dest/js/main.js': ['organizer_part/src/js/**/*.js', 'common_part/js/**/*.js'],

                    'main_part/dest/less/concated.less': ['main_part/src/less/**/*.less', 'common_part/less/**/*.less'],
                    'runner_part/dest/less/concated.less': ['runner_part/src/less/**/*.less', 'common_part/less/**/*.less'],
                    'organizer_part/dest/less/concated.less': ['organizer_part/src/less/**/*.less', 'common_part/less/**/*.less'],
                },
            },
        },

        includes: {
            files: [{
                src: ['main_part/src/html/*.html'],
                dest: 'main_part/dest/html', 
                flatten: true,
                options: {
                    flatten: true,
                    includePath: 'main_part/src/partials'
                }
            },{
                src: ['runner_part/src/html/*.html'],
                dest: 'runner_part/dest/html', 
                flatten: true,
                options: {
                    flatten: true,
                    includePath: 'runner_part/src/partials'
                }
            },{
                src: ['organizer_part/src/html/*.html'],
                dest: 'organizer_part/dest/html', 
                flatten: true,
                options: {
                    flatten: true,
                    includePath: 'organizer_part/src/partials'
                }
            }]
        },

        less: {
            development: {
                files: {
                    'main_part/dest/css/result.css' : ['main_part/dest/less/concated.less', 'main_part/dest/less/sprites.less'],
                    'runner_part/dest/css/result.css' : ['runner_part/dest/less/concated.less', 'runner_part/dest/less/sprites.less'],
                    'organizer_part/dest/css/result.css' : ['organizer_part/dest/less/concated.less', 'organizer_part/dest/less/sprites.less'],
                }
            }
        },

        /*sprite:{
            all: {
                src: 'src/icons-for-sprite/*.png',
                dest: 'images/sprite.png',
                destCss: 'layout/css/sprite.css'
            }
        },*/

        watch: {
            scripts: {
                files: ["main_part/src/less/*.*","main_part/src/js/*.*","main_part/src/html/*.*","main_part/src/partials/*.*", 
                        "runner_part/src/less/*.*","runner_part/src/js/*.*","runner_part/src/html/*.*","runner_part/src/partials/*.*",
                        "organizer_part/src/less","organizer_part/src/js/*.*","organizer_part/src/html/*.*","organizer_part/src/partials/*.*",],
                tasks: ['clean', 'concat', 'less', 'includes'],
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
/*    grunt.loadNpmTasks('grunt-spritesmith');
*/    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['clean', 'concat', 'less', 'includes', 'watch']);

};