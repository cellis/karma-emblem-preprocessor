(function() {

  require('./cli');

  var createEmblemPreprocessor = function(logger, basePath) {
    var emblem = require('emblem');
    var handlebars = require('handlebars');
    var ember = require('ember');

    var log = logger.create('preprocessor.emblem');

    return function(content, file, done) {
      var processed = null;

      log.debug('Processing "%s".', file.originalPath);

      try {
        var template = new Cli({args: [file.originalPath]}).parseCommandLineArgs();

        var path = file.originalPath.replace(new RegExp('\\\\', 'g'), '/').replace(/^app\//, '').replace(/^templates\//,'').replace(/^\.\w+$/,'');
        var content = emblem.precompile(handlebars, template.content);
        var processed = "Ember.TEMPLATES['" + JSON.stringify(path) + "'] = Ember.Handlebars.template(" + content + ");";

      } catch (e) {
        log.error('%s\n  at %s', e.message, file.originalPath);
      }

      done(processed);
    };
  };

  createEmblemPreprocessor.$inject = ['logger', 'config.basePath'];

  module.exports = {
    'preprocessor:emblem': ['factory', createEmblemPreprocessor]
  };

}).call(this);