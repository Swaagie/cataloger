/**
 * Collection of Excerpts.
 * @module Collection
 */

//
// Run the script in strict mode.
//
'use strict';

//
// Required modules.
//
var Excerpt = require('./excerpt')
  , mkdirp = require('mkdirp');

/**
 * Constructor for collection of Excerpts.
 *
 * @alias module:Collection
 * @constructor
 * @param {Array} excerpts list of documentation excerpts
 * @public
 */
function Collection(excerpts) {
  if (excerpts) this.add(excerpts);
}

/**
 * Add single or multiple excerpts to the the collection.
 *
 * @param {Array} excerpts list of documentation excerpts
 * @public
 */
Collection.prototype.add = function add(excerpts) {
  var collection = this;

  excerpts = Array.isArray(excerpts) ? excerpts : [ excerpts ];
  excerpts.forEach(function create(excerpt) {
    excerpt = new Excerpt(excerpt);
    collection[excerpt.id] = excerpt;
  });
};

/**
 * Render the catalog by processing each excerpt.
 *
 * @param {
 */
Collection.prototype.render = function render(done) {
  done(null);
}

//
// Expose the constructor.
//
module.exports = Collection;
