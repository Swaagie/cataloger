/**
 * Helper methods.
 * @module Helper
 */

//
// Run the script in strict mode.
//
'use strict';

/**
 * Small helper to write array to console stdout / stderr.
 *
 * @param {Array} lines content
 * @param {Boolean} error should we use error instead of log
 * @public
 */
exports.output = function output(lines, error) {
  lines = Array.isArray(lines) ? lines : [ lines ];

  lines.unshift('');
  lines.forEach(function details(line) {
    console[error ? 'error' : 'log'](line);
  });
};

/**
 * Create a comma separated list of method arguments.
 *
 * @param {Object} parameters
 * @returns {String} comma separated argumnet list
 * @public
 */
exports.syntax = function syntax(parameters) {
  return parameters.reduce(function list(result, parameter) {
    return (!result ? result : result + ', ') + parameter.name;
  }, '');
};

/**
 * Join the provided list by comma.
 *
 * @param {Array} array list
 * @returns {String} list joined by comma
 * @public
 */
exports.join = function join(array) {
  return array.join(', ');
};
