/**
 * Scaffolder to generate default set of files.
 * @module Scaffold
 */

//
// Run the script in strict mode.
//
'use strict';

//
// Required modules.
//
var mkdirp = require('mkdirp')
  , path = require('path')
  , fs = require('fs');

/**
 * Expose the scaffold module.
 *
 * @alias Scaffold
 * @constructor
 * @param {Object} options
 * @public
 */
function Scaffold(options) {
  this.destination = path.resolve(options.destination || process.cwd());
  this.filename = options.filename || /\.json$/.test(options.destination)
    ? path.basename(this.destination)
    : 'cataloger.json';
}

/**
 * Create directory at provided destination.
 *
 * @param {Function} next optional callback to execute after directory is created.
 * @private
 */
Scaffold.prototype.mkdir = function mkdir(done) {
  if ('function' === typeof done) return mkdirp(this.destination, 775, done);
  mkdirp.sync(this.destination, 775);
};

/**
 * Create a default JSON configuration file.
 *
 * @param {Function} done optiona callback to call after file is written.
 * @public
 */
Scaffold.prototype.options = function options(done) {
  var target = path.join(this.destination, this.filename)
    , content = JSON.stringify({
        path: process.cwd(),
        output: path.sep + 'catalog',
        exclude: [ 'test', 'bin', 'catalog' ],
        parsers: [ 'jsdoc' ],
        wiki: { include: false, user: 'name', project: 'name' }
      }, null, 2);

  //
  // Execute sync as no callback was provided.
  //
  if ('function' !== typeof done) {
    this.mkdir();
    fs.writeFileSync(target, content);
    return target;
  }

  //
  // Execute async as callback was provided.
  //
  this.mkdir(function dirmade(err, made) {
    if (err) return done(err);

    fs.writeFile(target, content, function saved(err) {
      if (err) return done(err);
      done(target);
    });
  });
};

//
// Expose the constructor.
//
module.exports = Scaffold;
