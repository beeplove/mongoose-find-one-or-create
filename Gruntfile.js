'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 5000
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.registerTask('mocha', 'mochaTest');
    grunt.registerTask('default', 'mochaTest');
    grunt.registerTask('test', 'mochaTest');
}
