/**
 * Scaffolder to generate default set of files.
 * @module Scaffold
 */

//
// Run the script in strict mode.
//
'use strict';

/**
 * Expose the scaffold module.
 *
 * @alias module:Scaffold
 * @constructor
 * @param {Object} options
 * @public
 */
function Scaffold (options) {
  this.filename = options.filename || 'cataloger.opts';
  this.destination = options.destination || path.join(process.cwd(), this.filename);
}

// If we were given a path, we should create it if it doesn't exist or we
// should just default to the users current working directory.
Scaffold.prototype.touch = function touch() {
  require('mkdirp').sync(destination, 775);
}

Scaffold.prototype.options = function options() {
  // Write an example square.json file.
  fs.writeFileSync(path.join(destination, 'square.json'), JSON.stringify({
      configuration: {
        dist: '/path/to/storage/{type}/bundlename.{ext}'
      }

    , bundle: {
        'path/to/file.js': {
            description: '{string} -- a small description about the use of file.css'
          , weight: '{number} 100 -- used to override the default order of inclusion'
          , version: '{string} 0.0.0 -- the version of a third party script'
          , latest: '{string} -- remote url of the third party asset'
          , extract: [
                '{array} of variable or function names to extract from the source'
              , 'if you want to exclude these functions of vars, let the first item'
              , 'be a the boolean `true`'
            ]
        },
        'example/parser.coffee': {
            description: 'config parser written in pure coffeescript'
        },
        'example/jQuery.js': {
            description: 'Cross browser DOM utility library'
          , latest: 'http://code.jquery.com/jquery.js'
          , version: '1.8.3'
        }
      }
  }, null, 2));

}
