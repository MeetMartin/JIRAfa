import {log} from './utilities/logger.js';
import {addJIRAfaEventEmitters, onBacklogUpdated, onBacklogDrawn, onBacklogShown, onActiveSprintsUpdated,
    onActiveViewChanged, onPopState} from './modules/event-manager.js';
import {makeBacklogIssuesAlwaysCompact} from './modules/backlog-compacter.js';
import {addButtonBanner} from './modules/button-banner.js';

const emitters = addJIRAfaEventEmitters ();
log (`${emitters.length} of emitters added.`);

onPopState (() => log ('URL changed.'));
onActiveViewChanged (() => log ('Active view changed.'));
onBacklogShown (() => log ('Backlog is shown.'));
onBacklogDrawn (() => log ('Backlog is drawn.'));
onBacklogUpdated (() => log ('Backlog updated.'));
onActiveSprintsUpdated (() => log ('Active Sprints updated.'));

makeBacklogIssuesAlwaysCompact ();
addButtonBanner ();