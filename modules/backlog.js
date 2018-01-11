'use strict';

import {log} from './utils.js';

/**
 * Returns the end element of a single backlog issue
 * @param issue {Element}
 * @returns {jQuery}
 */
const findTheEndOfIssue = issue => $(issue).find ('span.ghx-end');

/**
 * Finds extra fields content of a single issue, compacts it and prepends to a target element
 * @param issue {Element}
 * @param target {jQuery}
 * @returns {jQuery}
 */
const compactAndMoveExtraFieldsContent = (issue, target) =>
    $(issue).find ('span.ghx-extra-field-content')
        .addClass ('aui-label')
        .parent ().removeClass ('ghx-extra-field')
        .prependTo (target);

/**
 * Finds Ecic and Version elements and prepends to a target element
 * @param issue {Element}
 * @param target {jQuery}
 * @returns {jQuery}
 */
const moveEpicAndVersion = (issue, target) =>  $(issue).find ("div.ghx-end span.aui-label").prependTo (target);

/**
 * Finds extra fields, appends them to a target element and compacts the issue
 * @param issue {Element}
 * @param target {jQuery}
 * @returns {jQuery}
 */
const moveExtraFieldsAndCompactIssue = (issue, target) => {
    const extraFields = $(issue).find ('.ghx-plan-extra-fields');
    extraFields.parent ().append (target);
    extraFields.hide ();
    return extraFields;
};


/**
 * Compacts UI of all issues in backlog so they are displayed as one line
 * @returns {Promise}
 */
const createCompactBacklogIssues = async () => {
    const backlogIssue = $('.ghx-backlog  .js-issue');
    backlogIssue.each ((index, issue) => {
        const endOfIssue = findTheEndOfIssue ();
        compactAndMoveExtraFieldsContent (issue, endOfIssue);
        moveEpicAndVersion (issue, endOfIssue);
        moveExtraFieldsAndCompactIssue (issue, endOfIssue);
    });
    log (backlogIssue.length + ' of issues was compacted in backlog.');
};

export {
    createCompactBacklogIssues
};