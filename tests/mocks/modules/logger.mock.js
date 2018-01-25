let logLevel = 0;
const getLogLevel = () => logLevel;
const setLogLevel = level =>
    (index => index === -1 ? logLevel : logLevel = index % 3) ([0, 1, 2, 'none', 'error', 'log'].indexOf (level));
const log = message => message;
const error = log;

export default {
    getLogLevel,
    setLogLevel,
    log,
    error
};