'use strict';

import {log, error} from './utils.js';

/**
 * Returns boolean whether JIRA backlog view is currently available by checking GH objects
 * @returns {boolean}
 */
const isBacklogAvailable = () => GH && GH.BacklogView && GH.PlanController && GH.PlanDragAndDrop;

/**
 * Adds a handler function to the event of JIRA Backlog being shown (issue data are not loaded yet)
 * @param handler {function}
 * @returns {boolean}
 */
const onBacklogShown = handler => {
    if (isBacklogAvailable ()) {
        const original = GH.PlanController.show;
        GH.PlanController.show = () => {
            original ();
            handler ();
        };
        log (`Added handler for onBacklogShown.`);
        return true;
    } else {
        error ('Backlog is not available to add new handler to onBacklogShown.');
        return false;
    }
};
/**
 * Adds a handler function to the event of JIRA Backlog being drawn (data loaded and issues displayed)
 * @param handler {function}
 * @returns {boolean}
 */
const onBacklogDrawn = handler => {
    if (isBacklogAvailable ()) {
        const original = GH.BacklogView.draw;
        GH.BacklogView.draw = () => {
            original ();
            handler ();
        };
        log (`Added handler for onBacklogDrawn.`);
        return true;
    } else {
        error ('Backlog is not available to add new handler to onBacklogDrawn.');
        return false;
    }
};

/**
 * Adds a handler function to the event of JIRA Backlog issues dragg and drop enabled
 * @param handler {function}
 * @returns {boolean}
 */
const onPlanDragAndDropEnabled = handler => {
    if (isBacklogAvailable ()) {
        const original = GH.PlanDragAndDrop.enableDragAndDrop;
        GH.PlanDragAndDrop.enableDragAndDrop = () => {
            original ();
            handler ();
        };
        log (`Added handler for onPlanDragAndDropEnabled.`);
        return true;
    } else {
        error ('Backlog is not available to add new handler to onPlanDragAndDropEnabled.');
        return false;
    }
};

export {
    isBacklogAvailable,
    onBacklogShown,
    onBacklogDrawn,
    onPlanDragAndDropEnabled
};