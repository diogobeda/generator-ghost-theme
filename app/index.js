'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var GhostThemeGenerator = module.exports = function GhostThemeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GhostThemeGenerator, yeoman.generators.Base);

GhostThemeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'themeName',
    message: 'What do you want to call your theme?',
    default: 'new-ghost-theme'
  }];

  this.prompt(prompts, function (props) {
    this.themeName = props.themeName;

    cb();
  }.bind(this));
};

GhostThemeGenerator.prototype.app = function app() {
  // folders
  this.mkdir('assets');
  this.mkdir('assets/css');
  this.mkdir('assets/css/sass');
  this.mkdir('assets/js');
  this.mkdir('assets/fonts');

  // css assets
  this.copy('assets/css/screen.css');
  this.copy('assets/css/sass/screen.scss');
  this.copy('assets/css/config.rb');

  // handlebars templates
  this.copy('default.hbs');
  this.copy('index.hbs');
  this.copy('post.hbs');
  
  // project files
  this.copy('Gruntfile.js');
  this.template('_README.md', 'README.md');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
};

GhostThemeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
};
