'use strict';

import {log, error} from './logger.js';

/**
 * Returns boolean whether JIRA backlog view is currently available by checking GH objects
 * @returns {boolean}
 */
const isBacklogAvailable = () => GH && GH.BacklogView && GH.PlanController && GH.PlanDragAndDrop;

/**
 * Curry to trigger handler on event
 * @param event {string}
 * @returns {function(function=): (jQuery)}
 */
const on = event => handler => $(document).on (event, handler);

/**
 * Adds event emitter to backlog drawn triggering jirafa-backlog-drawn
 */
const addEvenEmitterToBacklogDrawn = () => {
    const original = GH.BacklogView.draw;
    GH.BacklogView.draw = () => {
        const result = original ();
        $(document).trigger ('jirafa-backlog-drawn');
        return result;
    };
};

/**
 * Adds a handler function to the event of JIRA Backlog drawn (data loaded and issues displayed)
 * @param handler {function}
 * @returns {jQuery}
 */
const onBacklogDrawn = on ('jirafa-backlog-drawn');

/**
 * Adds event emitter to backlog updated jirafa-backlog-updated
 */
const addEvenEmitterToBacklogUpdated = () => {
    const original = GH.PlanDragAndDrop.enableDragAndDrop;
    GH.PlanDragAndDrop.enableDragAndDrop = () => {
        const result = original ();
        $(document).trigger ('jirafa-backlog-updated');
        return result;
    };
};

const addEvenEmitterToActiveSprintsUpdated = () => {
    const original = GH.WorkController.setPoolData;
    GH.WorkController.setPoolData = data => {
        const result = original (data);
        $(document).trigger ('jirafa-active-sprints-updated');
        return result;
    };
};
const onActiveSprintsUpdated = on ('jirafa-active-sprints-updated');

/**
 * Adds a handler function to the event of JIRA Backlog updated (data loaded and issues displayed)
 * @param handler {function}
 * @returns {jQuery}
 */
const onBacklogUpdated = on ('jirafa-backlog-updated');

/**
 * Adds all JIRAfa event emitters to GH object methods
 */
const addJIRAfaEventEmitters = () => {
    if (isBacklogAvailable ()) {
        addEvenEmitterToBacklogDrawn ();
        addEvenEmitterToBacklogUpdated ();
        addEvenEmitterToActiveSprintsUpdated ();
        log ('Event Emitters added.');
    } else {
        error ('Backlog is not available to add emitters.');
    }
};

export {
    isBacklogAvailable,
    addJIRAfaEventEmitters,
    onBacklogDrawn,
    onBacklogUpdated,
    onActiveSprintsUpdated
};