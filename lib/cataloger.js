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
var handlebars = require('handlebars')
  , readdirp = require('readdirp')
  , helpers = require('./helpers')
  , request = require('request')
  , colors = require('colors')
  , mkdirp = require('mkdirp')
  , async = require('async')
  , path = require('path')
  , fs = require('fs');

//
// List of files that contain folders or files to ignore.
// And Shortcut to helpers#output.
//
var ignore = [ '.npmignore', '.gitignore' ]
  , output = helpers.output;

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
  this.options = options;
  this.path = options.path || process.cwd();
  this.output = options.output || process.cwd();
  this.exclude = options.exclude || [];
  this.parsers = options.parsers || [ 'jsdoc' ];
  this.wiki = options.wiki || { include: false };
  this.cache = {};

  //
  // Parsing of options is done. Initialize our module.
  //
  this.init().view();
}

/**
 * Initialize the module.
 *
 * @returns {Catalog} fluent interface
 * @private
 */
Cataloger.prototype.init = function init() {
  var cataloger = this
    , available = list();

  //
  // Determine template directory.
  //
  this.source = path.join(
    __dirname,
    '..',
    'templates',
    this.options.template || 'default'
  );

  //
  // Prepare base path for raw wiki content.
  //
  if (this.wiki.include) {
    this.git = [
      'https://raw.github.com/wiki',
      this.wiki.user,
      this.wiki.project
    ].join('/');
  }

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

  return this;
};

/**
 * Fetch and cache template content.
 *
 * @returns {String} handlebar template
 * @public
 */
Cataloger.prototype.view = function view() {
  if (this.template) return this.template;
  var cataloger = this;

  //
  // Register partials and helpers for handlebars.
  //
  for (var key in helpers) handlebars.registerHelper(key, helpers[key]);
  fs.readdirSync(cataloger.source).forEach(function load(partial) {
    handlebars.registerPartial(
      path.basename(partial, '.mustache'),
      fs.readFileSync(path.join(cataloger.source, partial), 'utf-8')
    );
  });

  //
  // Get and pre-compile the main template
  //
  return this.template = handlebars.compile(
    fs.readFileSync(path.join(this.source, 'index.mustache'), 'utf-8')
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

      //
      // No need to include the wiki return early.
      //
      if (!cataloger.wiki.include || !cataloger.git) return collection.write(cataloger, next);

      //
      // Add wiki content to the collection.
      //
      cataloger.merge(collection, function merged(err) {
        if (err) return next(err);
        collection.write(cataloger, next);
      });
    }, done);
  });
};

/**
 * Merge the wiki by map with the Excerpt.
 *
 * @param {Collection} collections cataloged collections of excerpts
 * @param {Funtion} done callback to call after merging wiki content
 * @public
 */
Cataloger.prototype.merge = function merge(collection, done) {
  var cataloger = this
    , map = this.wiki.map
    , wiki = { method: 'GET', timeout: 10000 };

  //
  // Loop over all the mapped files.
  //
  async.each(Object.keys(map), function loopWiki(file, next) {
    if (file in cataloger.cache) {
      collection.get(file).wiki = cataloger.cache[file];
      return next(null);
    }

    //
    // Wiki content was not found in cache, request it from github.
    //
    wiki.uri = cataloger.git + '/' + map[file];
    request(wiki, function get(err, resp, body) {
      if (err || resp.statusCode !== 200) return next(err || resp.statusCode);

      if (collection.has(file)) collection.get(file).wiki = body;
      cataloger.cache[file] = body;

      next(null);
    });
  }, done);
};

//
// Expose the constructor and list function.
//
module.exports = Cataloger;
Cataloger.list = list;
