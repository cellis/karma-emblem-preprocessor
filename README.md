# karma-emblem-preprocessor

> preprocessor to compile emblem templates for ember.js on the fly

For more information on Karma see the [homepage]

Requires Karma 0.9+

To use this with karma, first you will need to install it with npm 

		npm install karma-emblem-preprocessor

Next you need to create a configuration file using karma init


    module.exports = function(karma) {
        karma.set({
            basePath: 'js',

            files: [
              "vendor/jquery/jquery.min.js",
              "vendor/handlebars/handlebars.js",
              "vendor/ember/ember.js",
              "app.js",
              "tests/*.js",
              "templates/*.handlebars"
            ],

            logLevel: karma.LOG_ERROR,
            browsers: ['PhantomJS'],
            singleRun: true,
            autoWatch: false,

            frameworks: ["qunit"],

            plugins: [
                'karma-qunit',
                'karma-chrome-launcher',
                'karma-emblem-preprocessor',
                'karma-phantomjs-launcher'
            ],

            preprocessors: {
                "**/*.emblem": 'emblem'
            }
        });
    };


[homepage]: http://karma-runner.github.com
