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
 * @returns {boolean}
 */
const setLogLevel = level => {
  const options = [0, 1, 2, 'none', 'error', 'log'];
  const index = options.indexOf (level);
  if (index === -1) return false;
  if (index < 3) logLevel = index;
  else logLevel = index -3;
  return true;
};

/**
 * Outputs to console depending on log level.
 * @param func {function}
 * @param message {string}
 * @param style {string}
 * @returns {boolean}
 */
const out = (func, message, style = 'color: #86d8f7') => {
    if ((logLevel === 1 && func === console.error) || logLevel === 2) {
        func ('%cJIRAfa: ' + message, style);
        return true;
    }
};

/**
 * Outputs console.log depending on log level.
 * @param message {string}
 * @returns {boolean}
 */
const log = message => out (console.log, message);

/**
 * Outputs console.error depending on log level.
 * @param message {string}
 * @returns {boolean}
 */
const error = message => out (console.error, message, 'color: red');

export {
    getLogLevel,
    setLogLevel,
    log,
    error
};