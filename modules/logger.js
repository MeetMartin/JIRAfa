'use strict';

let logLevel = 0;

/**
 * Gets numerical representation of log level: 0 = none, 1 = error, 2 = log.
 * @returns {number}
 */
const getLogLevel = () => logLevel;

/**
 * Sets log level by a number or a name: 0 = none, 1 = error, 2 = log.
 * @param level {number|string}
 * @returns {number}
 */
const setLogLevel = level =>
    (index => index === -1 ? logLevel : logLevel = index % 3)
    ([0, 1, 2, 'none', 'error', 'log'].indexOf (level));
// Immediately Invoked Function Expression

/**
 * Outputs to console depending on log level.
 * @param func {function}
 * @param message {string}
 * @param style {string}
 * @returns {boolean}
 */
const out = (func, message, style) =>
    (logLevel === 1 && func === console.error) || logLevel === 2 ?
        func ('%cJIRAfa: ' + message, style) : null;

/**
 * Outputs console.log depending on log level.
 * @param message {string}
 * @returns {boolean}
 */
const log = message => out (console.log, message, 'color: #86d8f7');

/**
 * Outputs console.error depending on log level.
 * @param message {string}
 * @returns {boolean}
 */
const error = message => out (console.error, message, 'color: #f00');

export {
    getLogLevel,
    setLogLevel,
    log,
    error
};