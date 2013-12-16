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
  , mkdirp = require('mkdirp')
  , async = require('async')
  , path = require('path')
  , fs = require('fs');

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
  this.store = [];
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
    collection.store.push(excerpt.id);
  });
};

/**
 * Render the catalog by processing each excerpt.
 *
 * @param {Function} done
 * @public
 */
Collection.prototype.write = function write(cataloger, done) {
  var collection = this
    , target;

  async.each(collection.store, function writeExcerpt(key, next) {
    target = path.join(cataloger.output, collection[key].file.parentDir);
    mkdirp(target, function createPath(err) {
      if (err) return next(err);

      fs.writeFile(
        path.join(cataloger.output, key.replace('.js', '.md')),
        collection[key].render(cataloger),
        next
      );
    });
  }, done);
};

//
// Expose the constructor.
//
module.exports = Collection;
