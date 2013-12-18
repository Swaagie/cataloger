/**
 * Wrapper around the JSDoc parser.
 *
 * @module JSDoc
 */

//
// Run the script in strict mode.
//
'use strict';

//
// Required modules.
//
var Collection = require('../lib/collection')
  , async = require('async')
  , path = require('path');

//
// Define root and path to parser, JSDoc cannot be included normally.
//
var root = path.resolve(__dirname, '../node_modules/jsdoc')
  , parser = path.join(root, 'cli.js');

/**
 * JSDoc wrapper constructor.
 *
 * @alias JSDoc
 * @constructor
 * @public
 */
function JSDoc() {
  //
  // Prepare global environment and app options for JSDoc.
  //
  global.env = {
    dirname: root,
    pwd: root,
    opts: {
      destination: 'console',
      template: 'templates/haruki'
    },
    conf: {
      tags: {
        allowUnknownTags: true
      }
    }
  };

  global.app = {
    jsdoc: {}
  };
}

//
// Expose an ID for external listing or reference.
//
JSDoc.prototype.id = 'JSDoc';

/**
 * Execute the JSDoc comment parses with the haruki template to generate JSON
 *
 * @returns {Object} parsed JSON reprensentation of public comments.
 * @public
 */
JSDoc.prototype.execute = function execute(files, fn) {
  var jsdoc = this;

  //
  // Get the full path from the file, this mimicks jsdoc#scanFiles.
  //
  global.env.sourceFiles = files.map(function paths(file) {
    return file.fullPath;
  });

  //
  // JSDoc uses the dump method to output to stdout, overrule it. The path of
  // found files will be merged with the results
  //
  global.dump = function map(result) {
    var collection = new Collection;
    collection.register(jsdoc.transform).add(
      jsdoc.merge(result.classes, files)
    );

    fn(null, collection);
  };

  //
  // Require parser JIT so global options are set.
  //
  require(parser)
    .createParser()
    .parseFiles()
    .processParseResults();
};

/**
 * Modify parsed data to more unverisal data source.
 *
 * @param {Object} data original parsed data
 * @returns {Object} transformed data
 * @public
 */
JSDoc.prototype.transform = function transform(data) {
  data.instance = data.constructor;
  delete data.constructor;
  return data;
};

/**
 * Merge returned documentation with stats of each file, assume the arrays keep
 * their order as there is no other viable way.
 *
 * @param {Array} docs list of documentation excerpts
 * @param {Array} files list of source files
 * @public
 */
JSDoc.prototype.merge = function merge(docs, files) {
  var i = docs.length;

  while (i--) {
    docs[i].file = files[i];
  }

  return docs;
};

/**
 * Prepare the execute method for async parallel processing.
 *
 * @param {Array} files
 * @returns {Function} processor for
 * @public
 */
JSDoc.prototype.prepare = function prepare(files) {
  var jsdoc = this;

  //
  // This function will be consumed by async.parallel.
  //
  return function parse(fn) {
    jsdoc.execute(files, fn);
  };
};

//
// Expose the constructor.
//
module.exports = JSDoc;
