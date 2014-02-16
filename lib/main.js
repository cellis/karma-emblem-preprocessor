(function() {

  require('./cli');

  var createEmblemPreprocessor = function(logger, basePath, config) {

    jsdom = require('jsdom');
    fs = require('fs');

    config = typeof config === 'object' ? config : {};

    var paths = config.paths;

    var moduleName = config
    var log = logger.create('preprocessor.emblem');
    var window = jsdom.jsdom().createWindow();

    try {
      window.run(fs.readFileSync(paths.jquery,'utf-8'))
      window.run(fs.readFileSync(paths.handlebars,'utf-8'))
      window.run(fs.readFileSync(paths.emblem,'utf-8'))
      window.run(fs.readFileSync(paths.ember,'utf-8'))
      
    } catch(e) {
      log.error('karmaEmblemPreprocessor couldn\'t load dependencies for Emblem. \n %s \n Compiling emblem templates won\'t work', e.message);
    }

    return function(content, file, done) {
      var processed = null;

      log.info('Processing "%s".', file.originalPath);

      try {
        var template = new Cli({args: [file.originalPath]}).parseCommandLineArgs();

        var path = file.originalPath.replace(new RegExp('\\\\', 'g'), '/').replace(/^app\//, '').replace(/^templates\//,'').replace(/^\.\w+$/,'');
        var content = window.Emblem.precompile(window.Handlebars, template.content);

        processed = "Ember.TEMPLATES['" + JSON.stringify(path) + "'] = Ember.Handlebars.template(" + content + ");";
      } catch (e) {
        log.info('%s\n  at %s', e.message, file.originalPath);
      }

      done(processed);
    };
  };

  createEmblemPreprocessor.$inject = ['logger', 'config.basePath', 'config.karmaEmblemPreprocessor'];

  module.exports = {
    'preprocessor:emblem': ['factory', createEmblemPreprocessor]
  };

}).call(this);
