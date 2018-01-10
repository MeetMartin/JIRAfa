'use strict';

import {amIAlive} from './modules/jira.js';

if (amIAlive()) console.log ('Hello world!');