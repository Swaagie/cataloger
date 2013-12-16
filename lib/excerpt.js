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
var mustache = require('mustache');

/**
 * Excerpt constructor.
 *
 * @alias module:Excerpt
 * @constructor
 * @param {Object} data
 * @param {Function} transform
 * @public
 */
function Excerpt(data, transform) {
  if (!('file' in data)) throw new Error('invalid excerpt data, file stats missing');
  if ('function' === typeof transform) data = transform(data);

  for (var key in data) {
    this[key] = data[key];
  }
}

Excerpt.prototype = {
  /**
   * Define an ID by referencing the file path.
   *
   * @returns {String} relative path as ID.
   * @public
   */
  get id() {
    return this.file.path;
  },

  /**
   * Render the excerpt by template.
   *
   * @param {String} template mustache template
   * @returns {String} compiled content
   * @public
   */
  render: function render(template) {
    return mustache.render(template, this);
  }
};

//
// Expose the constructor.
//
module.exports = Excerpt;
