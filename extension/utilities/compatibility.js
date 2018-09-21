import {getActiveView} from '../modules/jira-views-manager.js';
import * as $$ from '../utilities/functional-jquery.js';

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
 * Returns boolean whether JIRA  Backlog HTML structure contains all expected elements in expected positions.
 * @param {JQuery} backlogIssues 
 * @return {Boolean} isBacklogIssuesHTMLStructureAsExpected :: JQuery -> Boolean
 */
const isBacklogIssuesHTMLStructureAsExpected = backlogIssues =>
    backlogIssues.length > 0 &&
    $$.find ('.ghx-end .ghx-label') (backlogIssues).length > 0 &&
    $$.find ('.ghx-plan-extra-fields') (backlogIssues).length > 0 &
    $$.find ('.js-key-link') (backlogIssues).length > 0 &&
    typeof GH.PlanController.updateDetailsView !== 'undefined';

/**
 * Returns boolean whether JIRA  Backlog is compatible with JIRAfa backlog compacter.
 * @return {Boolean} isBacklogCompacterCompatible :: () -> Boolean
 */
const isBacklogCompacterCompatible = () =>
    getActiveView (String (window.location)) !== 'Backlog'
        ?
            true
        :
            isBacklogIssuesHTMLStructureAsExpected ($ ('.js-issue'));

/**
 * Returns boolean whether JIRA is compatible with JIRAfa extension.
 * @return {Boolean} isJIRACompatible :: () -> Boolean
 */
const isJIRACompatible = () =>
    isGHAvailable () &&
    isGHCompatible ();

export {
    isGHAvailable,
    isGHCompatible,
    isBacklogCompacterCompatible,
    isJIRACompatible
}