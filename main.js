import {setLogLevel, log} from './modules/logger.js';
import {addJIRAfaEventEmitters, onBacklogUpdated, onBacklogDrawn, onActiveSprintsUpdated} from './modules/jira-event-manager.js';
import {makeBacklogIssuesAlwaysCompact} from './modules/backlog-compacter.js';

setLogLevel ('log');

addJIRAfaEventEmitters ();

onBacklogUpdated (() => log ('Backlog updated.'));
onBacklogDrawn (() => log ('Backlog is drawn.'));
onActiveSprintsUpdated (() => log ('Active Sprints updated.'));

makeBacklogIssuesAlwaysCompact ();