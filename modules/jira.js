'use strict';

import {log, error} from './utils.js';

/**
 * Returns boolean whether JIRA backlog view is currently available by checking GH objects
 * @returns {boolean}
 */
const isBacklogAvailable = () => GH && GH.BacklogView && GH.PlanController && GH.PlanDragAndDrop;

/**
 * Adds event emitter to backlog drawn triggering jirafa-backlog-drawn
 */
const addEvenEmitterToBacklogDrawn = () => {
    const original = GH.BacklogView.draw;
    GH.BacklogView.draw = () => {
        original ();
        $(document).trigger ('jirafa-backlog-drawn');
    };
};

/**
 * Adds a handler function to the event of JIRA Backlog drawn (data loaded and issues displayed)
 * @param handler {function}
 * @returns {jQuery}
 */
const onBacklogDrawn = handler => $(document).on ('jirafa-backlog-drawn', handler);

/**
 * Adds event emitter to backlog updated jirafa-backlog-updated
 */
const addEvenEmitterToBacklogUpdated = () => {
    const original = GH.PlanDragAndDrop.enableDragAndDrop;
    GH.PlanDragAndDrop.enableDragAndDrop = () => {
        original ();
        $(document).trigger ('jirafa-backlog-updated');
    };
};

/**
 * Adds a handler function to the event of JIRA Backlog updated (data loaded and issues displayed)
 * @param handler {function}
 * @returns {jQuery}
 */
const onBacklogUpdated = handler => $(document).on ('jirafa-backlog-updated', handler);

/**
 * Adds all JIRAfa event emitters to GH object methods
 */
const addJIRAfaEventEmitters = () => {
    if (isBacklogAvailable ()) {
        addEvenEmitterToBacklogDrawn ();
        addEvenEmitterToBacklogUpdated();
        log ('Event Emitters added.');
    } else {
        error ('Backlog is not available to add emitters.');
    }
};

export {
    isBacklogAvailable,
    addJIRAfaEventEmitters,
    onBacklogDrawn,
    onBacklogUpdated
};