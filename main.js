'use strict';

import {setLogLevel, log} from './modules/utils.js';
import {addJIRAfaEventEmitters, onBacklogUpdated, onBacklogDrawn} from './modules/jira.js';
import {makeBacklogIssueAlwaysCompact} from './modules/backlog-compacter.js';

setLogLevel ('log');

addJIRAfaEventEmitters ();

onBacklogUpdated (() => log ('Backlog updated.'));
onBacklogDrawn (() => log ('Backlog is drawn.'));

makeBacklogIssueAlwaysCompact ();