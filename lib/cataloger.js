'use strict';

//
// Required modules.
//
var readdirp = require('readdirp')
  , dox = require('dox')
  , fs = require('fs')
  , docs;

//
// List of JS files that should not be parsed. The contents of .gitignore are
// appended by default. Directories are supplied with a negating exclamation mark.
//
var exclude = [
  'test',
  'bin',
  'doc',
  'dist',
  'vendor',
  'docs.js',
  ''
].concat(
  fs.readFileSync(__dirname + '/.gitignore', 'utf-8').split('\n')
).filter(Boolean).map(function negate(entry) {
  return '!' + entry;
});

//
// Recursively loop all files and parse the comments.
//
readdirp({
    root: __dirname,
    fileFilter: '*.js',
    directoryFilter: exclude
  },
  function done(err, result) {
    if (err) return console.error(err);

    //
    // Loop and parse all the files,
    //
    result.forEachdox.parseComments(fs.readFileSync()
  }
);
