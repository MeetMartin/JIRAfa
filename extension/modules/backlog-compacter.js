import {log} from './logger.js';
import {composePipe, id} from './functional-programming.js';
import {onBacklogDrawn, onBacklogUpdated} from './jira-event-manager.js';

/**
 * Returns the end element of a single backlog issue
 * @param {JQuery} issue JIRA .js-issue node
 * @return {JQuery} findTheEndOfIssue :: JQuery -> JQuery
 */
const findTheEndOfIssue = issue => issue.find ('.ghx-end');

/**
 * Finds extra fields content of a single issue, compacts it and prepends to a target element
 * @param {JQuery} issue JIRA .js-issue node
 * @return {JQuery} compactAndMoveExtraFieldsContent :: JQuery -> JQuery
 */
const compactAndMoveExtraFieldsContent = issue =>
    issue.find ('.ghx-extra-field-content')
        .addClass ('aui-label')
        .parent ().removeClass ('ghx-extra-field')
        .prependTo (findTheEndOfIssue (issue))
    && issue;
/**
 * Finds Epic and Version elements and prepends to a target element
 * @param {JQuery} issue JIRA .js-issue node
 * @return {JQuery} moveEpicAndVersion :: JQuery -> JQuery
 */
const moveEpicAndVersion = issue =>
    issue.find ('.ghx-end .aui-label').prependTo (findTheEndOfIssue (issue)) && issue;

/**
 * Finds extra fields, appends them to a target element and compacts the issue
 * @param {JQuery} issue JIRA .js-issue element
 * @return {JQuery} moveExtraFieldsAndCompactIssue :: JQuery -> JQuery
 */
const moveExtraFieldsAndCompactIssue = issue => {
    const extraFields = issue.find ('.ghx-plan-extra-fields');
    extraFields.parent ().append (findTheEndOfIssue (issue));
    extraFields.remove ();
    return issue;
};

/**
 * Removes extra items with None value
 * @param {JQuery} backlogIssues backlog issues where we should perform the changes
 * @return {JQuery} removeExtraItemsWithNoneValue :: JQuery -> JQuery
 */
const removeExtraItemsWithNoneValue = backlogIssues =>
    backlogIssues.find ('span.ghx-extra-field-content:contains(None)').remove () && backlogIssues;

/**
 * Marks issue as processed by adding css class JIRAfaCompacted
 * @param {JQuery} issue issue JIRA .js-issue element
 * @return {JQuery} markIssueAsProcessed :: JQuery -> JQuery
 */
const markIssueAsProcessed = issue => issue.addClass ('JIRAfaCompacted');

/**
 * Processes a single backlog issue making it more compact
 * @param {JQuery} issue issue JIRA .js-issue element
 * @return {JQuery} compactIssue :: JQuery -> JQuery
 */
const compactIssue = issue => composePipe (
    moveEpicAndVersion,
    compactAndMoveExtraFieldsContent,
    moveExtraFieldsAndCompactIssue,
    markIssueAsProcessed
) (issue);

/**
 * Gets JQuery of backlog issues to process
 * @return {JQuery} issuesToProcess :: () -> JQuery
 */
const issuesToProcess = () => $ ('.js-issue:not(.JIRAfaCompacted)');

/**
 * Compacts UI of all issues in backlog so they are displayed as one line
 * @return {JQuery} compactBacklogIssues :: () -> JQuery
 */
const compactBacklogIssues = () => (issues => issues.length > 0 ?
    log (issues.length + ' of issues was compacted in backlog.') &&
        removeExtraItemsWithNoneValue (issues).each ((index, issue) => compactIssue ($ (issue))) &&
            issues :
    issues) (issuesToProcess ());

/**
 * Makes backlog issues always compact
 * @returns {compactBacklogIssues} makeBacklogIssuesAlwaysCompact :: null -> (a -> b)
 */
const makeBacklogIssuesAlwaysCompact = () =>
    log ('Backlog issues will always be compact.') &&
    composePipe (id, onBacklogDrawn, onBacklogUpdated) (compactBacklogIssues);

export {
    makeBacklogIssuesAlwaysCompact
};