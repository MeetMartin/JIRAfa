'use strict';

import {log} from './utils.js';
import {onPlanDragAndDropEnabled} from './jira.js';

/**
 * Returns the end element of a single backlog issue
 * @param issue {Element}
 * @returns {jQuery}
 */
const findTheEndOfIssue = issue => $(issue).find ('span.ghx-end');

/**
 * Finds extra fields content of a single issue, compacts it and prepends to a target element
 * @param issue {Element}
 * @returns {jQuery}
 */
const compactAndMoveExtraFieldsContent = issue =>
    $(issue).find ('span.ghx-extra-field-content')
        .addClass ('aui-label')
        .parent ().removeClass ('ghx-extra-field')
        .prependTo (findTheEndOfIssue (issue));

/**
 * Finds Ecic and Version elements and prepends to a target element
 * @param issue {Element}
 * @returns {jQuery}
 */
const moveEpicAndVersion = issue =>  $(issue).find ("div.ghx-end span.aui-label").prependTo (findTheEndOfIssue (issue));

/**
 * Finds extra fields, appends them to a target element and compacts the issue
 * @param issue {Element}
 * @returns {jQuery}
 */
const moveExtraFieldsAndCompactIssue = issue => {
    const extraFields = $(issue).find ('.ghx-plan-extra-fields');
    extraFields.parent ().append (findTheEndOfIssue (issue));
    extraFields.remove ();
    return extraFields;
};

/**
 * Removes extra items with None value
 * @returns {jQuery}
 */
const removeExtraItemsWithNoneValue = () => $('span.ghx-extra-field-content:contains(None)').remove();


/**
 * Compacts UI of all issues in backlog so they are displayed as one line
 * @returns {Promise}
 */
const compactBacklogIssues = async () => {
    removeExtraItemsWithNoneValue ();
    const backlogIssue = $('.ghx-backlog .js-issue:not(.JIRAfaCompacted)');
    backlogIssue.each ((index, issue) => {
        compactAndMoveExtraFieldsContent (issue);
        moveEpicAndVersion (issue);
        moveExtraFieldsAndCompactIssue (issue);
        $(issue).addClass('JIRAfaCompacted');
    });
    log (backlogIssue.length + ' of issues was compacted in backlog.');
};

/**
 * Makes backlog issues always compact
 */
const makeBacklogIssueAlwaysCompact = () => {
    onPlanDragAndDropEnabled (compactBacklogIssues);
    log ('Backlog issues will always be compact.');
};

export {
    makeBacklogIssueAlwaysCompact
};