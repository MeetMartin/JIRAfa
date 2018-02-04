const id = a => a;
const isGHAvailable = () => true;
const addJIRAfaEventEmitters = () => true;
const getActiveView = () => url =>
    url.includes ('rapidView') ?
        url.includes ('view=planning') ? 'Backlog' :
        url.includes ('view=reporting') ? 'Reports' :
        'Active Sprints' :
    url.includes ('browse') ? 'Open Issue' : 'Unknown';
const onPopState = id;
const onActiveViewChanged = id;
const onBacklogShown = id;
const onBacklogDrawn = id;
const onBacklogUpdated = id;
const onActiveSprintsUpdated = id;

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