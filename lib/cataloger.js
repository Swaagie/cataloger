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
var output = require('./helper').output
  , readdirp = require('readdirp')
  , colors = require('colors')
  , mkdirp = require('mkdirp')
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
  if (list.cache) return list.cache;

  var parsers = path.join(__dirname, '../parsers');
  return list.cache = fs.readdirSync(parsers).map(function name(parser) {
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
  this.path = options.path || process.cwd();
  this.output = options.output || process.cwd();
  this.exclude = options.exclude || [];
  this.parsers = options.parsers || [ 'jsdoc' ];
  this.template = this.mustache(options.template || 'default.md');

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
    file = path.join(cataloger.path, file);
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
 * Fetch and cache template content.
 *
 * @param {String} name filename of the template
 * @returns {String} mustache template
 * @public
 */
Cataloger.prototype.mustache = function mustache(name) {
  if (this.template) return this.template;
  return this.template = fs.readFileSync(
    path.join(__dirname, '../templates', name),
    'utf-8'
  );
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
    root: cataloger.path,
    fileFilter: '*.js',
    directoryFilter: cataloger.exclude
  },function found(err, result) {
    if (err) return done(err);

    //
    // Remove empty files.
    //
    result = result.files.filter(function empty(file) {
      return file.stat.size;
    });

    output([
      'Running cataloger with parsers ' + list().join(', ').magenta + ' against files:',
    ].concat(
      result.map(function name(file) {
        return '  - '.grey + file.path;
      })
    ));

    //
    // Run each of the parsers in parallel.
    //
    async.parallel(cataloger.parsers.map(function prepare(parser) {
      return parser.prepare(result);
    }), function processed(err, collections) {
      if (err) return done(err);
      cataloger.write(collections, done);
    });
  });
};

/**
 * Write all collections to disk.
 *
 * @param {Collection} collections cataloged collections of excerpts
 * @param {Funtion} done callback to call after writing is complete
 */
Cataloger.prototype.write = function write(collections, done) {
  var cataloger = this;

  mkdirp(cataloger.output, function prepare() {
    output('Prepared output directory: ' + cataloger.output.green);
    async.each(collections, function writer(collection, next) {
      // @TODO Add logic to prevent double excerpts if parsers picked up similar content
      collection.write(cataloger, next);
    }, done);
  });
};

//
// Expose the constructor and list function.
//
module.exports = Cataloger;
Cataloger.list = list;
