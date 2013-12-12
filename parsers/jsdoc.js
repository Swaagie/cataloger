/**
 * Wrapper around the JSDoc parser
 * @module JSDoc
 */

//
// Run the script in strict mode.
//
'use strict';

//
// Required modules.
//
var path = require('path')
  , root = path.resolve(__dirname, '../node_modules/jsdoc');

//
// Prepare global environment options for JSDoc...
//
global.env = {
  dirname: root,
  pwd: root,
  conf: {
    tags: { allowUnknownTags: true }
  },
  opts: {
    destination: 'console',
    template: 'templates/haruki'
  }
};

global.app = {
  jsdoc: {}
};

global.dump = console.log;

/**
 * JSDoc wrapper constructor.
 *
 * @alias module:JSDoc
 * @constructor
 * @param {Object} options
 * @public
 */
function JSDoc(options) {
  options = options || {};
}

/**
 * Execute the JSDoc comment parses with the haruki template to generate JSON
 *
 * @returns {Object} parsed JSON reprensentation of public comments.
 * @public
 */
JSDoc.prototype.execute = function execute(files, fn) {
  global.env.sourceFiles = files.map(function paths(file) {
    return file.fullPath;
  });

  //
  //
  //
  var parser = require('../node_modules/jsdoc/cli.js');
  parser.createParser().parseFiles().processParseResults();

  fn(null, files);
};

JSDoc.prototype.prepare = function prepare(files) {
  var parser = this;

  return function parse(fn) {
    parser.execute(files, fn);
  };
};

//
// Expose the constructor.
//
module.exports = JSDoc;
