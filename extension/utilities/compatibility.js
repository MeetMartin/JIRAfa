/**
 * Returns boolean whether JIRA GrassHopper object is currently available.
 * @return {Boolean} isGHAvailable :: () -> Boolean
 */
const isGHAvailable = () => typeof GH !== 'undefined';

/**
 * Returns boolean whether JIRA GrassHopper object is compatible with JIRAfa extension.
 * @return {Boolean} isGHCompatible :: () -> Boolean
 */
const isGHCompatible = () =>
    typeof GH.PlanController !== 'undefined' &&
    typeof GH.BacklogView !== 'undefined' &&
    typeof GH.PlanDragAndDrop !== 'undefined' &&
    typeof GH.WorkController !== 'undefined' &&
    typeof GH.PlanController.show !== 'undefined' &&
    typeof GH.BacklogView.draw !== 'undefined' &&
    typeof GH.PlanDragAndDrop.enableDragAndDrop !== 'undefined' &&
    typeof GH.WorkController.setPoolData !== 'undefined' &&
    typeof GH.PlanController.updateDetailsView !== 'undefined';

/**
 * Returns boolean whether JIRA is compatible with JIRAfa extension.
 * @return {Boolean} isJIRACompatible :: () -> Boolean
 */
const isJIRACompatible = () => isGHAvailable () && isGHCompatible ();

export {
    isGHAvailable,
    isGHCompatible,
    isJIRACompatible
}