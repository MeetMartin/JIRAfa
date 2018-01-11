'use strict';

import {setLogLevel, log} from './modules/utils.js';
import {onBacklogShown, onBacklogDrawn} from './modules/jira.js';
import {createCompactBacklogIssues} from './modules/backlog.js';

setLogLevel ('log');

onBacklogShown (() => log ('Backlog view is shown.'));

onBacklogDrawn (createCompactBacklogIssues);
onBacklogDrawn (() => log ('Backlog is drawn.'));