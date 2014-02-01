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

              {pattern: 'bower_components/jquery/jquery.js',            included: false},
              # {pattern: 'bower_components/ember/ember.js',            included: false},
              {pattern: 'bower_components/expect/expect.js',            included: false},
              {pattern: 'vendor/scripts/*.js',                          included: false},
              {pattern: 'app/initialize.coffee',                        included: false},
              {pattern: 'app/**/*.coffee',                              included: false},
              {pattern: 'test/**/*_spec.coffee',                        included: false},
              {pattern: 'test/*.coffee',                                included: false},

              'test/test-main.js',

              'bower_components/ember/ember.js',
              'app/templates/*.emblem'

            ],

            karmaEmblemPreprocessor: {
              paths: {
                jquery: 'bower_components/jquery/jquery.js',
                ember: 'bower_components/ember/ember.js',
                handlebars: 'bower_components/handlebars/handlebars.js',
                emblem: 'vendor/scripts/emblem.js'
              }
            }

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
