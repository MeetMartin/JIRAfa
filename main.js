'use strict';

import {setLogLevel, log} from './modules/logger.js';
import {addJIRAfaEventEmitters, onBacklogUpdated, onBacklogDrawn} from './modules/jira-event-manager.js';
import {makeBacklogIssuesAlwaysCompact} from './modules/backlog-compacter.js';

setLogLevel ('log');

addJIRAfaEventEmitters ();

onBacklogUpdated (() => log ('Backlog updated.'));
onBacklogDrawn (() => log ('Backlog is drawn.'));

makeBacklogIssuesAlwaysCompact ();