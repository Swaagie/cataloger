/**
 * Command line interface module which calls cataloger's API
 * @module Cli
 */

//
// Run the script in strict mode.
//
'use strict';

//
// Required modules.
//
var fs = require('fs')
  , path = require('path')
  , colors = require('colors');

//
// Prepare Scaffold, Commander and cataloger's API.
//
var Cataloger = require('./cataloger')
  , Scaffold = require('./scaffold')
  , Commander = require('commander').Command;

/**
 * Command line interface constructor which allows custom arguments.
 *
 * @alias module:Cli
 * @constructor
 * @param {String} name
 * @param {Array} argv
 */
function Cli(name, argv) {
  this.name = name || 'cataloger';
  this.argv = argv || process.argv;

  //
  // Prepare commander.
  //
  this.initialize();
}

/**
 * Setup the command line interface for cataloger.
 *
 * @private
 */
Cli.prototype.initialize = function initialize() {
  var cli = this.cli = new Commander(this.name)
    , file = path.join(process.cwd(), 'cataloger.json')
    , options;

  //
  // Initialize commander.
  //
  cli
    .version(require('../package.json').version)
    .usage('[options] [path]')
    .option('-o, --output <output>', 'directory to store markdown files', 'catalog')
    .option('-e, --exclude <exclude>', 'do not process these files or directories', this.list, [])
    .option('-p, --parser <parser>', 'specify the parser to use', 'jsdoc');

  //
  // Allow user to init default Cataloger options file.
  //
  cli
    .command('init [path]')
    .description('scaffold a cataloger.json file')
    .action(this.init.bind(this));

  //
  // List the available parsers
  //
  cli
    .command('list')
    .description('list the available parsers')
    .action(this.parsers.bind(this));

  //
  // Add command line arguments event listeners
  //
  cli.on('--help', this.help.bind(this));

  //
  // Parse the command line arguments.
  //
  this.logo();
  this.cli.parse(this.argv);

  //
  // If no arguments show help.
  //
  if (!cli.args.length && !fs.existsSync(file)) return this.help();

  //
  // Output all the found errors to STDERR.
  //
  if (cli.errors) return this.output(cli.errors, true);

  //
  // Create a cataloger instance with provided options and catalog.
  //
  options = require(file); // TODO merge in arguments
  this.cataloger = new Cataloger(options);
  this.cataloger.catalog();
};

/**
 * Prepare a default `cataloger.opts` file.
 *
 * @param {String} destination
 * @public
 */
Cli.prototype.init = function init(destination) {
  var target = new Scaffold({ destination: destination }).options();
  this.output([
    '',
    'Created a new ' + 'cataloger.json'.green + ' file at ' + target.green,
    '',
    'To learn more about catalogers options take a look at our',
    'documentation: ',
    ''
  ]);

  process.exit(0);
};

/**
 * Write array to console/stdout.
 *
 * @param {Array} lines content
 * @param {Boolean} error should we use error instead of log
 * @private
 */
Cli.prototype.output = function output(lines, error) {
  lines.forEach(function details(line) {
    console[error ? 'error' : 'log'](line);
  });
};

/**
 * List the available parsers.
 *
 * @public
 */
Cli.prototype.parsers = function parsers() {
  this.output([
    '',
    'The following parsers are available: ',
    Cataloger.list().join(', ').green,
    ''
  ]);
};

/**
 * Split the supplied argument to create an array.
 *
 * @param {String} value the command line flag value
 * @returns {Array} value splitted by comma
 * @private
 */
Cli.prototype.list = function list(value) {
  return value.split(',');
};

/**
 * Output the Cataloger ASCII logo.
 *
 * @returns {Cli} fluent interface
 * @public
 */
Cli.prototype.logo = function logo() {
  this.output([
    '        _______ _______                         ',
    '      _/       Y       \\\\                     ',
    '     // ~~ ~~  |  ~~ ~  \\\\                    ',
    '    // ' + 'C a t a l o g e r'.rainbow + ' \\\\ ',
    '   //________ .|. ________\\\\                  ',
    "  `-----------`-´-----------´                   "
  ]);

  return this;
};

/**
 * Output some Cataloger command line examples.
 *
 * @public
 */
Cli.prototype.help = function help() {
  this.output([
    '',
    'Examples:',
    '',
    '# Generate docs, requires cataloger.json to be present'.grey,
    'cataloger'.white,
    '',
    '# Scaffold default cataloger.json file on optional custom path'.grey,
    'cataloger init '.white + '/custom/path/to/cataloger.json'.green,
    '',
    '# Generate docs and store to custom path'.grey,
    'cataloger --output '.white + '/path/to/docs'.green,
    '',
    '# Generate docs with JSDoc parser and exclude tests and bin folder'.grey,
    'cataloger --parser '.white + 'jsdoc '.green + '--exclude '.white + 'test,bin'.green,
    ''
  ]);

  process.exit(0);
};

//
// Expose the constructor
//
module.exports = Cli;
