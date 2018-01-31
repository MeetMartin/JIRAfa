import {log} from './logger.js';
import {composePipe} from './functional-programming.js';
import {onBacklogDrawn, onBacklogUpdated} from './jira-event-manager.js';

/**
 * Returns the end element of a single backlog issue
 * @impure well... JQuery
 * @param {JQuery} issue JIRA .js-issue node
 * @returns {JQuery} JIRA .ghx-end element inside of issue
 */
const findTheEndOfIssue = issue => issue.find ('.ghx-end');

/**
 * Finds extra fields content of a single issue, compacts it and prepends to a target element
 * @impure well... JQuery
 * @param {JQuery} issue JIRA .js-issue node
 * @returns {JQuery} augmented issue
 */
const compactAndMoveExtraFieldsContent = issue =>
    issue.find ('.ghx-extra-field-content')
        .addClass ('aui-label')
        .parent ().removeClass ('ghx-extra-field')
        .prependTo (findTheEndOfIssue (issue))
    && issue;
/**
 * Finds Epic and Version elements and prepends to a target element
 * @impure well... JQuery
 * @param {JQuery} issue JIRA .js-issue node
 * @returns {JQuery} augmented issue
 */
const moveEpicAndVersion = issue =>
    issue.find ('.ghx-end .aui-label').prependTo (findTheEndOfIssue (issue)) && issue;

/**
 * Finds extra fields, appends them to a target element and compacts the issue
 * @impure well... JQuery
 * @param {JQuery} issue JIRA .js-issue element
 * @returns {JQuery} augmented issue
 */
const moveExtraFieldsAndCompactIssue = issue => {
    const extraFields = issue.find ('.ghx-plan-extra-fields');
    extraFields.parent ().append (findTheEndOfIssue (issue));
    extraFields.remove ();
    return issue;
};

/**
 * Removes extra items with None value
 * @impure well... JQuery
 * @param {JQuery} backlogIssues backlog issues where we should perform the changes
 * @returns {JQuery} backlogIssues without extra items
 */
const removeExtraItemsWithNoneValue = backlogIssues =>
    backlogIssues.find ('span.ghx-extra-field-content:contains(None)').remove () && backlogIssues;

/**
 * Marks issue as processed by adding css class JIRAfaCompacted
 * @impure well... JQuery
 * @param {JQuery} issue issue JIRA .js-issue element
 * @returns {JQuery} augmented issue
 */
const markIssueAsProcessed = issue => issue.addClass ('JIRAfaCompacted');

/**
 * Processes a single backlog issue making it more compact
 * @impure well... JQuery
 * @param {JQuery} issue issue JIRA .js-issue element
 * @returns {JQuery} augmented issue
 */
const compactIssue = issue => composePipe (
    moveEpicAndVersion,
    compactAndMoveExtraFieldsContent,
    moveExtraFieldsAndCompactIssue,
    markIssueAsProcessed
) (issue);

/**
 * Compacts UI of all issues in backlog so they are displayed as one line
 * @impure well... JQuery
 * @returns {JQuery} Promise with JQuery elements of .js-issue:not(.JIRAfaCompacted)
 */
const compactBacklogIssues = () => {
    const backlogIssues = $ ('.js-issue:not(.JIRAfaCompacted)');
    if (backlogIssues.length > 0) {
        removeExtraItemsWithNoneValue (backlogIssues).each ((index, issue) => compactIssue ($ (issue)));
        log (backlogIssues.length + ' of issues was compacted in backlog.');
    }
    return backlogIssues;
};

/**
 * Makes backlog issues always compact
 * @impure well... JQuery
 * @returns {null} it has nothing to return
 */
const makeBacklogIssuesAlwaysCompact = () => {
    compactBacklogIssues ();
    onBacklogDrawn (compactBacklogIssues);
    onBacklogUpdated (compactBacklogIssues);
    log ('Backlog issues will always be compact.');
};

export {
    makeBacklogIssuesAlwaysCompact
};