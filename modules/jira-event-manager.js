import {log, error} from './logger.js';

/**
 * Returns boolean whether JIRA backlog view is currently available by checking GH objects
 * @returns {boolean} true if JIRA backlog view is available
 */
const isBacklogAvailable = () => GH && GH.BacklogView && GH.PlanController && GH.PlanDragAndDrop;

/**
 * Curry to trigger handler on event
 * @param {string} event event name
 * @returns {function(function=): (JQuery)} curried function to add event handler
 */
const on = event => handler => $ (document).on (event, handler);

/**
 * Adds event emitter to JIRA Backlog drawn triggering jirafa-backlog-drawn
 * @return {null} nothing to return
 */
const addEvenEmitterToBacklogDrawn = () => {
    const original = GH.BacklogView.draw;
    GH.BacklogView.draw = () => {
        const result = original ();
        $ (document).trigger ('jirafa-backlog-drawn');
        return result;
    };
};

/**
 * Adds a handler function to the event of JIRA Backlog drawn (data loaded and issues displayed)
 * @param {function} handler function to handle the event
 * @returns {JQuery} JQuery 'on' function
 */
const onBacklogDrawn = on ('jirafa-backlog-drawn');

/**
 * Adds event emitter to JIRA Backlog updated jirafa-backlog-updated
 * @returns {null} nothing to return
 */
const addEvenEmitterToBacklogUpdated = () => {
    const original = GH.PlanDragAndDrop.enableDragAndDrop;
    GH.PlanDragAndDrop.enableDragAndDrop = () => {
        const result = original ();
        $ (document).trigger ('jirafa-backlog-updated');
        return result;
    };
};


/**
 * Adds a handler function to the event of JIRA Backlog updated (data loaded and issues displayed)
 * @param {function} handler function to handle the event
 * @returns {JQuery} JQuery 'on' function
 */
const onBacklogUpdated = on ('jirafa-backlog-updated');

/**
 * Adds event emitter to JIRA Active Sprints updated jirafa-active-sprints-updated
 * @return {null} nothing to return
 */
const addEvenEmitterToActiveSprintsUpdated = () => {
    const original = GH.WorkController.setPoolData;
    GH.WorkController.setPoolData = data => {
        const result = original (data);
        $ (document).trigger ('jirafa-active-sprints-updated');
        return result;
    };
};

/**
 * Adds a handler function to the event of JIRA Active Sprints updated (data loaded and issues displayed)
 * @param {function} handler function to handle the event
 * @returns {JQuery} JQuery 'on' function
 */
const onActiveSprintsUpdated = on ('jirafa-active-sprints-updated');

/**
 * Adds all JIRAfa event emitters to GH object methods
 * @returns {null} nothing to return
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