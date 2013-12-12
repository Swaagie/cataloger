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
var path = require('path');

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

  //
  // Prepare global options for JSDoc...
  //
  global.env = {
    dirname: path.resolve(__dirname, '../node_modules/jsdoc'),
    conf: {},
    opts: {}
  };

  global.app = {
    jsdoc: {}
  };
}

/**
 * Execute the JSDoc comment parses with the haruki template to generate JSON
 *
 * @returns {Object} parsed JSON reprensentation of public comments.
 * @public
 */
JSDoc.prototype.execute = function execute(files, fn) {
  global.env.sourceFiles = files;

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
