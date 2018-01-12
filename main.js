'use strict';

import {setLogLevel, log} from './modules/utils.js';
import {onBacklogShown, onBacklogDrawn, onPlanDragAndDropEnabled} from './modules/jira.js';
import {makeBacklogIssueAlwaysCompact} from './modules/backlog-compacter.js';

setLogLevel ('log');

onBacklogShown (() => log ('Backlog view is shown.'));
onBacklogDrawn (() => log ('Backlog is drawn.'));
onPlanDragAndDropEnabled (() => log ('Backlog issue drag & drop enabled.'));

makeBacklogIssueAlwaysCompact ();