/**
 * Default markup for excerpt of documentation.
 * @module Excerpt
 */

//
// Run the script in strict mode.
//
'use strict';

//
// Required modules.
//
var jsdoc = require('../parser/jsdoc');

/**
 * Excerpt constructor.
 *
 * @alias module:Excerpt
 * @constructor
 * @param {Object} options
 * @public
 */
function Excerpt(options) {
  options = options || {};

  this.parser = options.parser || jsdoc
  if (options.data) this.parse(options.data, this.parser);
}

/**
 * Parse provided data for excerpt
 *
 * @param {Array} data blob of data representating a single method
 * @param {Function} parser function to process the provided data.
 * @public
 */
Excerpt.prototype.parse = function parse(data, parser) {
  var data = data.map(parser);
};

//
// Expose the constructor.
//
module.exports = Excerpt;
