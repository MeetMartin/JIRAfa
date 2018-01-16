import {log, error} from './logger.js';

/**
 * Backlog | Active Sprints | Reports | Unknown
 * @type {string}
 */
let activeAgileView = 'Unknown';

/**
 * Gets active Agile view (null if unavailable)
 * @returns {string} Backlog | Active Sprints | Reports | Unknown
 */
const getActiveAgileView = () => activeAgileView;

/**
 * Returns boolean whether JIRA GH object is currently available
 * @returns {boolean} true if JIRA GH object is available
 */
const isGHAvailable = () => GH && GH.BacklogView && GH.PlanController && GH.PlanDragAndDrop && GH.WorkController;


/**
 * Curry to trigger handler on event
 * @param {string} event event name
 * @returns {function(function=): (JQuery)} curried function to add event handler
 */
const on = event => handler => $ (document).on (event, handler);

/**
 * Sets active Agile view based on current url
 * @returns {null} nothing to return
 */
const setActiveAgileViewBasedOnUrl = () => {
    const url = String (window.location);
    if (url.includes ('rapidView')) {
        if (url.includes ('view=planning')) {
            activeAgileView = 'Backlog';
        } else if (url.includes ('view=reporting')) {
            activeAgileView = 'Reports';
        } else {
            activeAgileView = 'Active Sprints';
        }
    } else {
        activeAgileView = 'Unknown';
    }
};

/**
 * Adds event emitter to JIRA on active Agile view chagge triggering jirafa-active-agile-view-changed
 * @return {null} nothing to return
 */
const addEvenEmitterToActiveAgileViewChanged = () => {
    setActiveAgileViewBasedOnUrl ();
    window.onpopstate = () => {
        const originalState = getActiveAgileView ();
        setActiveAgileViewBasedOnUrl ();
        const newState = getActiveAgileView ();
        if (originalState !== newState) {
            log (`Active Agile view is ${newState}.`);
            $ (document).trigger ('jirafa-active-agile-view-changed');
        }
    };
};

/**
 * Adds a handler function to the event of JIRA active Agile view change
 * @param {function} handler function to handle the event
 * @returns {JQuery} JQuery 'on' function
 */
const onActiveAgileViewChanged = on ('jirafa-active-agile-view-changed');

/**
 * Adds event emitter to JIRA Backlog shown triggering jirafa-backlog-shown
 * @return {null} nothing to return
 */
const addEvenEmitterToBacklogShown = () => {
    const original = GH.PlanController.show;
    GH.PlanController.show = () => {
        const result = original ();
        $ (document).trigger ('jirafa-backlog-shown');
        return result;
    };
};

/**
 * Adds a handler function to the event of JIRA Backlog shown (data not loaded and issues not displayed)
 * @param {function} handler function to handle the event
 * @returns {JQuery} JQuery 'on' function
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
    if (isGHAvailable ()) {
        addEvenEmitterToActiveAgileViewChanged ();
        addEvenEmitterToBacklogShown ();
        addEvenEmitterToBacklogDrawn ();
        addEvenEmitterToBacklogUpdated ();
        addEvenEmitterToActiveSprintsUpdated ();
        log ('Event Emitters added.');
    } else {
        error ('Backlog is not available to add emitters.');
    }
};

export {
    isGHAvailable,
    getActiveAgileView,
    addJIRAfaEventEmitters,
    onActiveAgileViewChanged,
    onBacklogShown,
    onBacklogDrawn,
    onBacklogUpdated,
    onActiveSprintsUpdated
};