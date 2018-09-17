/**
 * Returns boolean whether JIRA GrassHopper object is currently available.
 * @return {Boolean} isGHAvailable :: () -> Boolean
 */
const isGHAvailable = () => typeof GH !== 'undefined';

/**
 * Returns boolean whether JIRA is compatible with JIRAfa extension.
 * @return {Boolean} isJIRACompatible :: () -> Boolean
 */
const isJIRACompatible = () => isGHAvailable ();

export {
    isGHAvailable,
    isJIRACompatible
}