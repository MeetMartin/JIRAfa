import {log, error} from './logger.js';

/**
 * Backlog | Active Sprints | Reports | Open Issue | Unknown
 * @type {string}
 */
let activeView = 'Unknown';

/**
 * Gets active view (null if unavailable)
 * @returns {string} Backlog | Active Sprints | Reports | Open Issue | Unknown
 */
const getActiveView = () => activeView;

/**
 * Returns boolean whether JIRA GrassHopper object is currently available
 * @returns {boolean} true if JIRA GH object is available
 */
const isGHAvailable = () => typeof GH !== 'undefined';

/**
 * Curry to trigger handler on event
 * @param {string} event event name
 * @returns {function(function=): (string)} curried function to add event handler
 */
const on = event => handler => {
    document.addEventListener (event, handler);
    return event;
};

/**
 * Triggers (dispatches) an event
 * @param {string} event name of the event
 * @returns {boolean} always true
 */
const trigger = event => document.dispatchEvent (new Event (event));

/**
 * Checks whether a string can be found in url
 * @param {string} str to be found in url
 * @returns {boolean} whether url includes a string
 */
const urlIncludes = str => String (window.location).includes (str);

/**
 * Sets active view based on current url
 * @returns {string} active view
 */
const setActiveViewBasedOnUrl = () => {
    if (urlIncludes ('rapidView')) {
        if (urlIncludes ('view=planning')) return activeView = 'Backlog';
        if (urlIncludes ('view=reporting')) return activeView = 'Reports';
        return activeView = 'Active Sprints';
    } else if (urlIncludes ('browse')) return activeView = 'Open Issue';
    return activeView = 'Unknown';
};

/**
 * Adds event emitter to popstate
 * @returns {string} aname of the event
 */
const addEventEmitterToOnPopState = () => {
    const event = 'jirafa-onpopstate';
    window.onpopstate = () => trigger (event);
    return event;
};

/**
 * Adds a handler function to the event popstate
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onPopState = on ('jirafa-onpopstate');

/**
 * Adds event emitter to JIRA on active view change triggering jirafa-active-view-changed
 * @return {null} nothing to return
 */
const addEvenEmitterToActiveViewChanged = () => {
    setActiveViewBasedOnUrl ();
    onPopState (() => {
        const originalState = getActiveView ();
        setActiveViewBasedOnUrl ();
        const newState = getActiveView ();
        if (originalState !== newState) {
            log (`Active Agile view is ${newState}.`);
            trigger ('jirafa-active-view-changed');
        }
    });
};

/**
 * Adds a handler function to the event of JIRA active view change
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onActiveViewChanged = on ('jirafa-active-view-changed');

/**
 * Adds event emitter to JIRA Backlog shown triggering jirafa-backlog-shown
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
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onBacklogShown = on ('jirafa-backlog-shown');

/**
 * Adds event emitter to JIRA Backlog drawn triggering jirafa-backlog-drawn
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
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
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
        trigger ('jirafa-backlog-updated');
        return result;
    };
};


/**
 * Adds a handler function to the event of JIRA Backlog updated (data loaded and issues displayed)
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
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
        trigger ('jirafa-active-sprints-updated');
        return result;
    };
};

/**
 * Adds a handler function to the event of JIRA Active Sprints updated (data loaded and issues displayed)
 * @param {function} handler function to handle the event
 * @returns {string} name of the event
 */
const onActiveSprintsUpdated = on ('jirafa-active-sprints-updated');

/**
 * Adds all JIRAfa event emitters to GH object methods
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
    error ('Backlog is not available to add emitters.');
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