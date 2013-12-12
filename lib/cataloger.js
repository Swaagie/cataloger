/**
 * Cataloger's API.
 * @module Cataloger
 */

//
// Run the script in strict mode.
//
'use strict';

//
// Required modules.
//
var readdirp = require('readdirp')
  , async = require('async')
  , path = require('path')
  , fs = require('fs');

//
// List of files that contain folders or files to ignore.
//
var ignore = [ '.npmignore', '.gitignore' ];

/**
 * Return a list of available parsers.
 *
 * @returns {Array} paths to parsers
 * @public
 */
function list() {
  var parsers = path.join(__dirname, '../parsers');
  return fs.readdirSync(parsers).map(function name(parser) {
    return path.basename(parser, '.js');
  });
}

/**
 * API constructor.
 *
 * @alias module:Cataloger
 * @constructor
 * @public
 */
function Cataloger(options) {
  options = options || {};

  //
  // Set some default options.
  //
  this.input = process.cwd(); // TODO allow user to decide.
  this.output = options.output || process.cwd();
  this.exclude = options.exclude || [];
  this.parsers = options.parsers || [ 'jsdoc' ];

  //
  // Parsing of options is done. Initialize our module.
  //
  this.init();
}

/**
 * Initialize the module.
 *
 * @private
 */
Cataloger.prototype.init = function init() {
  var cataloger = this
    , available = list();

  //
  // Add default files to the exclusion list.
  //
  ignore.forEach(function exclude(file) {
    file = path.join(cataloger.input, file);
    if (!fs.existsSync(file)) return;

    cataloger.exclude.push.apply(
      cataloger.exclude,
      fs.readFileSync(file, 'utf-8').split('\n')
    );
  });

  cataloger.exclude = cataloger.exclude.filter(Boolean).map(function negate(entry) {
    return '!' + entry;
  });

  //
  // Filter available parsers and initialize.
  //
  this.parsers = this.parsers.filter(function filterParsers(parser) {
    return ~available.indexOf(parser);
  }).map(function filterParsers(parser) {
    return new (require('../parsers/' + parser));
  });
};

/**
 * Generate a catalog of the documentation.
 *
 * @param {Function} done callback called after every file is processed.
 * @public
 */
Cataloger.prototype.catalog = function catalog(done) {
  var cataloger = this;

  //
  // Recursively loop all files and parse the comments.
  //
  readdirp({
    root: cataloger.input,
    fileFilter: '*.js',
    directoryFilter: cataloger.exclude
  },function done(err, result) {
    if (err) throw err;
console.log(result.files);
    //
    // Run each of the parsers in parallel.
    //
    async.each(result.files, function parse(parser) {
      console.log(parser.execute());
    });
    }
  );
};

//
// Expose the constructor and list function.
//
module.exports = Cataloger;
Cataloger.list = list;
