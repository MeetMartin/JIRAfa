import {setLogLevel, log} from './modules/logger.js';
import {addJIRAfaEventEmitters, onBacklogUpdated, onBacklogDrawn, onBacklogShown, onActiveSprintsUpdated,
    onActiveAgileViewChanged} from './modules/jira-event-manager.js';
import {makeBacklogIssuesAlwaysCompact} from './modules/backlog-compacter.js';
import {addButtonBanner} from './modules/button-banner.js';

setLogLevel ('log');

addJIRAfaEventEmitters ();

onActiveAgileViewChanged (() => log ('Active Agile view changed.'));
onBacklogShown (() => log ('Backlog is shown.'));
onBacklogDrawn (() => log ('Backlog is drawn.'));
onBacklogUpdated (() => log ('Backlog updated.'));
onActiveSprintsUpdated (() => log ('Active Sprints updated.'));

makeBacklogIssuesAlwaysCompact ();
addButtonBanner ();