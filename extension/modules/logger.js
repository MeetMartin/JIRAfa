/**
 * Outputs to console depending on log level.
 * @param {Function} func console.log or console.error
 * @returns {*} (a -> b) -> String -> a -> a
 */
const out = func => style => message => func (`%cJIRAfa: ${message}`, style) || message;

/**
 * Outputs console.log depending on log level.
 * @param {*} message to be printed to console
 * @returns {*} log :: a -> a
 */
const log = out (console.log) ('color: #86d8f7');

/**
 * Outputs console.error depending on log level.
 * @param {*} message to be printed to console
 * @returns {*} error :: a -> a
 */
const error = out (console.error) ('color: #f00');

export {
    log,
    error
};