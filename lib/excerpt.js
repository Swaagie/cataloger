/**
 * Default markup for excerpt of documentation.
 *
 * @module Excerpt
 */

//
// Run the script in strict mode.
//
'use strict';

/**
 * Construct a new Excerpt which is synonym for one file/page of the
 * documentation. An Excerpt can be rendered against a template.
 *
 * @alias Excerpt
 * @constructor
 * @param {Object} data parsed content to provide to this excerpt
 * @param {Function} transform process and transform data before storing
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
   * An ID is defined by referencing the file path.
   *
   * @returns {String} relative path as ID
   * @public
   */
  get id() {
    return this.file.path;
  },

  /**
   * Render the excerpt by template.
   *
   * @param {Cataloger} cataloger instance
   * @returns {String} compiled content
   * @public
   */
  render: function render(cataloger) {
    return cataloger.template(this);
  }
};

//
// Expose the constructor.
//
module.exports = Excerpt;
