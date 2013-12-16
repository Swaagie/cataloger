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
  , colors = require('colors')
  , output = require('./helper').output;

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
  this.start = Date.now();

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
  var cli = this
    , ui = new Commander(cli.name)
    , file = path.join(process.cwd(), 'cataloger.json')
    , options;

  //
  // Initialize commander.
  //
  ui
    .version(require('../package.json').version)
    .usage('[options] [path]')
    .option('-o, --output <output>', 'directory to store markdown files', 'catalog')
    .option('-e, --exclude <exclude>', 'do not process these files or directories', cli.list, [])
    .option('-p, --parsers <parsers>', 'specify the parser to use', cli.list, ['jsdoc']);

  //
  // Allow user to init default Cataloger options file.
  //
  ui
    .command('init [path]')
    .description('scaffold a cataloger.json file')
    .action(cli.init.bind(cli));

  //
  // List the available parsers
  //
  ui
    .command('list')
    .description('list the available parsers')
    .action(cli.parsers.bind(cli));

  //
  // Add command line arguments event listeners
  //
  ui.on('--help', cli.help.bind(cli));

  //
  // Parse the command line arguments.
  //
  cli.logo();
  ui.parse(cli.argv);

  //
  // If no arguments show help.
  //
  if (!ui.args.length && !fs.existsSync(file)) return cli.help();

  //
  // Output all the found errors to STDERR.
  //
  if (ui.errors) return cli.output(ui.errors, true);

  //
  // Create a cataloger instance with provided options.
  //
  options = require(file);
  if (ui.args.length && fs.existsSync(path.resolve(ui.args[0]))) {
    options.path = ui.args[0];
  }

  Object.keys(options).forEach(function mergeOptions(key) {
    if (ui[key] && ui[key].length) options[key] = ui[key];
  });

  options.output = path.resolve(options.output);

  //
  // Catalog all documentation.
  //
  cli.cataloger = new Cataloger(options);
  output('Creating new catalog for project in: ' + options.path.green);

  cli.cataloger.catalog(function done(err) {
    if (err) return console.error(err);

    output([
      'Catalog completed in' + (' ' + (Date.now() - cli.start)).blue + ' ms',
      ''
    ]);

    process.exit(0);
  });
};

/**
 * Prepare a default `cataloger.opts` file.
 *
 * @param {String} destination
 * @public
 */
Cli.prototype.init = function init(destination) {
  var target = new Scaffold({ destination: destination }).options();
  output([
    'Created a new ' + 'cataloger.json'.green + ' file at ' + target.green,
    '',
    'To learn more about catalogers options take a look at our',
    'documentation: ',
    ''
  ]);

  process.exit(0);
};

/**
 * List the available parsers.
 *
 * @public
 */
Cli.prototype.parsers = function parsers() {
  output([
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
  output([
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
  output([
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
    'cataloger --parsers '.white + 'jsdoc '.green + '--exclude '.white + 'test,bin'.green,
    ''
  ]);

  process.exit(0);
};

//
// Expose the constructor
//
module.exports = Cli;
