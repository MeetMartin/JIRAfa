import {log, error} from './logger.js';

/**
 * Returns boolean whether JIRA GrassHopper object is currently available
 * @impure
 * @returns {boolean} true if JIRA GH object is available
 */
const isGHAvailable = () => typeof GH !== 'undefined';

/**
 * Curry to trigger handler on event
 * @impure
 * @param {string} event event name
 * @returns {function(function=): (string)} curried function to add event handler
 */
const on = event => handler => document.addEventListener (event, handler) || event;

/**
 * Triggers (dispatches) an event
 * @impure
 * @param {string} event name of the event
 * @returns {boolean} always true
 */
const trigger = event => document.dispatchEvent (new Event (event));

/**
 * Sets active view based on current url
 * @pure
 * @param {string} url url to be checked
 * @returns {string} active view
 */
const getActiveView = url =>
    url.includes ('rapidView') ?
        url.includes ('view=planning') ? 'Backlog' :
        url.includes ('view=reporting') ? 'Reports' :
        'Active Sprints' :
    url.includes ('browse') ? 'Open Issue' : 'Unknown';

/**
 * Adds event emitter to popstate
 * @impure
 * @returns {string} a name of the event
 */
const addEventEmitterToOnPopState =
    (event => () => window.onpopstate = () => trigger (event) || event) ('jirafa-onpopstate');

/**
 * Adds a handler function to the event popstate
 * @impure
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onPopState = on ('jirafa-onpopstate');

/**
 * Adds event emitter to JIRA on active view change triggering jirafa-active-view-changed
 * @impure
 * @return {null} nothing to return
 */
const addEvenEmitterToActiveViewChanged = () => {
    let activeView = getActiveView (String (window.location));
    onPopState (() => {
        const newState = getActiveView (String (window.location));
        if (activeView !== newState) {
            activeView = newState;
            log (`Active Agile view is ${newState}.`);
            trigger ('jirafa-active-view-changed');
        }
    });
};

/**
 * Adds a handler function to the event of JIRA active view change
 * @impure
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onActiveViewChanged = on ('jirafa-active-view-changed');

/**
 * Adds event emitter to JIRA Backlog shown triggering jirafa-backlog-shown
 * @impure
 * @return {null} nothing to return
 */
const addEvenEmitterToBacklogShown = () => {
    const original = GH.PlanController.show;
    GH.PlanController.show = () => {
        const result = original ();
        trigger ('jirafa-backlog-shown');
        return result;
    };
};

/**
 * Adds a handler function to the event of JIRA Backlog shown (data not loaded and issues not displayed)
 * @impure
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onBacklogShown = on ('jirafa-backlog-shown');

/**
 * Adds event emitter to JIRA Backlog drawn triggering jirafa-backlog-drawn
 * @impure
 * @return {null} nothing to return
 */
const addEvenEmitterToBacklogDrawn = () => {
    const original = GH.BacklogView.draw;
    GH.BacklogView.draw = () => {
        const result = original ();
        trigger ('jirafa-backlog-drawn');
        return result;
    };
};

/**
 * Adds a handler function to the event of JIRA Backlog drawn (data loaded and issues displayed)
 * @impure
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onBacklogDrawn = on ('jirafa-backlog-drawn');

/**
 * Adds event emitter to JIRA Backlog updated jirafa-backlog-updated
 * @impure
 * @returns {null} nothing to return
 */
const addEvenEmitterToBacklogUpdated = () => {
    const original = GH.PlanDragAndDrop.enableDragAndDrop;
    GH.PlanDragAndDrop.enableDragAndDrop = () => {
        const result = original ();
        trigger ('jirafa-backlog-updated');
        return result;
    };
};


/**
 * Adds a handler function to the event of JIRA Backlog updated (data loaded and issues displayed)
 * @impure
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onBacklogUpdated = on ('jirafa-backlog-updated');

/**
 * Adds event emitter to JIRA Active Sprints updated jirafa-active-sprints-updated
 * @impure
 * @return {null} nothing to return
 */
const addEvenEmitterToActiveSprintsUpdated = () => {
    const original = GH.WorkController.setPoolData;
    GH.WorkController.setPoolData = data => {
        const result = original (data);
        trigger ('jirafa-active-sprints-updated');
        return result;
    };
};

/**
 * Adds a handler function to the event of JIRA Active Sprints updated (data loaded and issues displayed)
 * @impure
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onActiveSprintsUpdated = on ('jirafa-active-sprints-updated');

/**
 * Adds all JIRAfa event emitters to GH object methods
 * @impure
 * @returns {boolean} true if GH is available and emitters are added
 */
const addJIRAfaEventEmitters = () => {
    if (isGHAvailable ()) {
        addEventEmitterToOnPopState ();
        addEvenEmitterToActiveViewChanged ();
        addEvenEmitterToBacklogShown ();
        addEvenEmitterToBacklogDrawn ();
        addEvenEmitterToBacklogUpdated ();
        addEvenEmitterToActiveSprintsUpdated ();
        log ('Event Emitters added.');
        return true;
    }
    error ('GH is not available to add emitters.');
    return false;
};

export {
    isGHAvailable,
    addJIRAfaEventEmitters,
    onPopState,
    onActiveViewChanged,
    getActiveView,
    onBacklogShown,
    onBacklogDrawn,
    onBacklogUpdated,
    onActiveSprintsUpdated
};