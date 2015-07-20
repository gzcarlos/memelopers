module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'src/app/**/*.js']
        },
        watch: {
            build: {
                files: ['src/**/*.js','src/**/*.css', 'src/**/*.html', 'src/**/*.json'],
                tasks: ['jshint', 'clean:build', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy', 'imagemin'],
                options: {
                    spawn: false,
                },
            },
            justcode: {
                files: ['src/**/*.js','src/**/*.css', 'src/**/*.html', 'src/**/*.json'],
                tasks: ['jshint',  'concat', 'uglify', 'cssmin', 'htmlmin', 'copy'],
                options: {
                    spawn: false,
                },
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    report: 'gzip',
                    cwd: 'build/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/assets/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            css: {
                src: ['src/assets/css/bootstrap.min.css', 'src/assets/css/bootstrap-theme.min.css', 'src/assets/css/font-awesome.min.css', 'src/assets/css/angular-busy.min.css', 'src/assets/css/angular-socialshare.min.css', 'src/assets/css/style.css'],
                dest: 'build/assets/css/main.css',
            },
            app:{
                src:['src/assets/js/jquery.min.js', 'src/assets/js/bootstrap.min.js', 'src/assets/js/angular.min.js','src/assets/js/angular-route.min.js','src/assets/js/angular-cookies.min.js','src/assets/js/angular-animate.min.js','src/assets/js/angular-busy.min.js','src/assets/js/angular-socialshare.min.js', 'src/assets/js/shared.js', 'src/app/app.js', 'src/app/factories/*.js', 'src/app/controllers/*.js'],
                dest:'build/app.js'
            }
        },
        uglify: {
            app:{
                src: 'build/app.js',
                dest: 'build/app.min.js'
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                duration: 3
            }
        },
        htmlmin: {
            main: {
                options: {
                    removeIgnored: true,
                    removeEmptyAttributes: true,
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'src/index.html'
                },
            },
            views: {
                files: [{
                    expand: true,
                    cwd: 'src/app/views',
                    src: '**/*.html',
                    dest: 'build/app/views'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/manifest.json'], dest: 'build/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['src/.htaccess'], dest: 'build/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['src/assets/fonts/*'], dest: 'build/assets/fonts/', filter: 'isFile'}
                ]
            }
        },
        clean:{
            build: {
                src:['build/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: 'build'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build', function () {
        grunt.task.run(['jshint', 'clean:build', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy', 'imagemin']);
    }); 
    grunt.registerTask('default', ['watch']);
};