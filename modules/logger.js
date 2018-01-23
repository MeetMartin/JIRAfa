/**
 * Holds log level used by the module. Behaves as a singleton.
 * @type {number} 0 = none, 1 = error, 2 = log
 */
let logLevel = 0;

/**
 * Gets numerical representation of log level.
 * @returns {number} 0 = none, 1 = error, 2 = log
 */
const getLogLevel = () => logLevel;

/**
 * Sets log level by a number or a name: 0 = none, 1 = error, 2 = log.
 * @param {number | string} level as string or number representation
 * @returns {number} new log level
 */
const setLogLevel = level =>
    (index => index === -1 ? logLevel : logLevel = index % 3) ([0, 1, 2, 'none', 'error', 'log'].indexOf (level));

/**
 * Outputs to console depending on log level.
 * @param {function} func console.log or console.error
 * @returns {null} nothing to return
 */
const out = func => style => message => {
    if ((logLevel === 1 && func === console.error) || logLevel === 2) {
        func ('%cJIRAfa: ' + message, style);
    }
    return message;
};

/**
 * Outputs console.log depending on log level.
 * @param {*} message to be printed to console
 * @returns {*} nothing to return
 */
const log = out (console.log) ('color: #86d8f7');

/**
 * Outputs console.error depending on log level.
 * @param {*} message to be printed to console
 * @returns {*} nothing to return
 */
const error = out (console.error) ('color: #f00');

export {
    getLogLevel,
    setLogLevel,
    log,
    error
};