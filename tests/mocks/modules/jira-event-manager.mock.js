const isGHAvailable = () => true;
const addJIRAfaEventEmitters = () => true;
const getActiveView = () => url =>
    url.includes ('rapidView') ?
        url.includes ('view=planning') ? 'Backlog' :
        url.includes ('view=reporting') ? 'Reports' :
        'Active Sprints' :
    url.includes ('browse') ? 'Open Issue' : 'Unknown';
const onPopState = handler => handler ();
const onActiveViewChanged = handler => handler ();
const onBacklogShown = handler => handler ();
const onBacklogDrawn = handler => handler ();
const onBacklogUpdated = handler => handler ();
const onActiveSprintsUpdated = handler => handler ();

export default {
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