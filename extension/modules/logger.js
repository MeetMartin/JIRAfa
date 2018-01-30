/**
 * Outputs to console depending on log level.
 * @pure
 * @param {function} func console.log or console.error
 * @returns {function(function(function=)): (*)} returns curried function resulting in original message
 */
const out = func => style => message => func (`%cJIRAfa: ${message}`, style) || message;

/**
 * Outputs console.log depending on log level.
 * @pure
 * @param {*} message to be printed to console
 * @returns {*} original message
 */
const log = message => out (console.log) ('color: #86d8f7') (message);

/**
 * Outputs console.error depending on log level.
 * @pure
 * @param {*} message to be printed to console
 * @returns {*} original message
 */
const error = message => out (console.error) ('color: #f00') (message);

export {
    log,
    error
};