import {log, error} from './utilities/logger.js';
import {isJIRACompatible} from './utilities/compatibility.js';
import {makeBacklogIssuesAlwaysCompact} from './modules/backlog-compacter.js';
import {activateButtonBanner} from './modules/button-banner.js';
import {
    addJIRAfaEventEmitters,
    onURLChanged,
    onBacklogUpdated,
    onBacklogDrawn,
    onBacklogShown,
    //onActiveSprintsUpdated,
    onActiveViewChanged,
    onPopState
} from './modules/event-manager.js';

if (!isJIRACompatible ()) {
    error ('JIRA is not compatible with the extension');
} else {
    log ('JIRA compatibility test passed.')

    const emitters = addJIRAfaEventEmitters ();
    log (`${emitters.length} emitters added.`);

    onPopState (() => log ('POP state changed.'));
    onURLChanged (() => log ('URL changed'));
    onActiveViewChanged (() => log ('Active view changed.'));
    onBacklogShown (() => log ('Backlog is shown.'));
    onBacklogDrawn (() => log ('Backlog is drawn.'));
    onBacklogUpdated (() => log ('Backlog updated.'));
    //onActiveSprintsUpdated (() => log ('Active Sprints updated.')); // seems not to work as expected with latest JIRA

    makeBacklogIssuesAlwaysCompact ();
    activateButtonBanner ();
}
