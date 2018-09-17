import {isGHAvailable} from '../utilities/compatibility.js';

/**
 * Curry to trigger handler on event
 * @param {String} event name of the event
 * @return {Function} on :: String -> (a -> b) -> (a -> b)
 */
const on = event => handler => document.addEventListener (event, handler) || handler;

/**
 * Triggers (dispatches) an event
 * @param {String} event name of the event
 * @return {Boolean} trigger :: String -> String
 */
const trigger = event => document.dispatchEvent (new Event (event)) && event;

/**
 * Sets active view based on current url
 * @param {String} url url to be checked
 * @return {String} getActiveView :: String -> String
 */
const getActiveView = url =>
    url.includes ('rapidView') ?
            url.includes ('view=planning') ? 'Backlog' :
            url.includes ('view=reporting') ? 'Reports' :
            'Active Sprints' :
        url.includes ('browse') ? 'Open Issue' :
        url.includes ('selectedItem=com.atlassian.jira.jira-projects-plugin:report-page') ? 'Report Page' :
        url.includes ('projects') ? 'Projects' :
        'Unknown';

/**
 * Adds event emitter to popstate
 * @return {String} addEventEmitterToOnPopState :: () -> String
 */
const addEventEmitterToOnPopState =
    (event => () => (window.onpopstate = () => trigger (event)) && event) ('jirafa-onpopstate');

/**
 * Adds a handler function to the event popstate
 * @param {Function} handler function to handle the event
 * @return {Function} onPopState :: (a -> b) -> (a -> b)
 */
const onPopState = on ('jirafa-onpopstate');

/**
 * Adds event emitter to JIRA on active view change triggering jirafa-active-view-changed
 * @return {String} addEvenEmitterToActiveViewChanged :: () -> String
 */
const addEvenEmitterToActiveViewChanged = () => {
    let activeView = getActiveView (String (window.location));
    const event = 'jirafa-active-view-changed';
    onPopState (() => {
        const newState = getActiveView (String (window.location));
        if (activeView !== newState) {
            activeView = newState;
            trigger (event);
        }
    });
    return event;
};

/**
 * Adds a handler function to the event of JIRA active view change
 * @param {Function} handler function to handle the event
 * @return {Function} onActiveViewChanged :: (a -> b) -> (a -> b)
 */
const onActiveViewChanged = on ('jirafa-active-view-changed');

/**
 * Adds event emitter to JIRA Backlog shown triggering jirafa-backlog-shown
 * @return {String} addEvenEmitterToBacklogShown :: () -> String
 */
const addEvenEmitterToBacklogShown = () => {
    const event = 'jirafa-backlog-shown';
    const original = GH.PlanController.show;
    GH.PlanController.show = () => {
        const result = original ();
        trigger (event);
        return result;
    };
    return event;
};

/**
 * Adds a handler function to the event of JIRA Backlog shown (data not loaded and issues not displayed)
 * @param {Function} handler function to handle the event
 * @return {Function} onBacklogShown :: (a -> b) -> (a -> b)
 */
const onBacklogShown = on ('jirafa-backlog-shown');

/**
 * Adds event emitter to JIRA Backlog drawn triggering jirafa-backlog-drawn
 * @return {String} addEvenEmitterToBacklogDrawn :: () -> String
 */
const addEvenEmitterToBacklogDrawn = () => {
    const event = 'jirafa-backlog-drawn';
    const original = GH.BacklogView.draw;
    GH.BacklogView.draw = () => {
        const result = original ();
        trigger (event);
        return result;
    };
    return event;
};

/**
 * Adds a handler function to the event of JIRA Backlog drawn (data loaded and issues displayed)
 * @param {Function} handler function to handle the event
 * @return {Function} onBacklogDrawn :: (a -> b) -> (a -> b)
 */
const onBacklogDrawn = on ('jirafa-backlog-drawn');

/**
 * Adds event emitter to JIRA Backlog updated jirafa-backlog-updated
 * @return {String} addEvenEmitterToBacklogUpdated :: () -> String
 */
const addEvenEmitterToBacklogUpdated = () => {
    const event = 'jirafa-backlog-updated';
    const original = GH.PlanDragAndDrop.enableDragAndDrop;
    GH.PlanDragAndDrop.enableDragAndDrop = () => {
        const result = original ();
        trigger (event);
        return result;
    };
    return event;
};

/**
 * Adds a handler function to the event of JIRA Backlog updated (data loaded and issues displayed)
 * @param {Function} handler function to handle the event
 * @return {Function} onBacklogUpdated :: (a -> b) -> (a -> b)
 */
const onBacklogUpdated = on ('jirafa-backlog-updated');

/**
 * Adds event emitter to JIRA Active Sprints updated jirafa-active-sprints-updated
 * @return {String} addEvenEmitterToActiveSprintsUpdated :: () -> String
 */
const addEvenEmitterToActiveSprintsUpdated = () => {
    const event = 'jirafa-active-sprints-updated';
    const original = GH.WorkController.setPoolData;
    GH.WorkController.setPoolData = data => {
        const result = original (data);
        trigger (event);
        return result;
    };
    return event;
};

/**
 * Adds a handler function to the event of JIRA Active Sprints updated (data loaded and issues displayed)
 * @param {Function} handler function to handle the event
 * @return {Function} onActiveSprintsUpdated :: (a -> b) -> (a -> b)
 */
const onActiveSprintsUpdated = on ('jirafa-active-sprints-updated');

/**
 * Adds all JIRAfa event emitters to GH object methods
 * @return {Array} addJIRAfaEventEmitters :: () -> [String]
 */
const addJIRAfaEventEmitters = () => [
    addEventEmitterToOnPopState (),
    addEvenEmitterToActiveViewChanged (),
    addEvenEmitterToBacklogShown (),
    addEvenEmitterToBacklogDrawn (),
    addEvenEmitterToBacklogUpdated (),
    addEvenEmitterToActiveSprintsUpdated ()
];

export {
    addJIRAfaEventEmitters,
    onPopState,
    onActiveViewChanged,
    getActiveView,
    onBacklogShown,
    onBacklogDrawn,
    onBacklogUpdated,
    onActiveSprintsUpdated
};