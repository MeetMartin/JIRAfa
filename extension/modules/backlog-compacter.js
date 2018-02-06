import {log} from '../utilities/logger.js';
import {pipe, id} from '../utilities/functional-programming.js';
import * as $$ from '../utilities/functional-jquery.js';
import {onBacklogDrawn, onBacklogUpdated} from './event-manager.js';

/**
 * Returns the end element of a single backlog issue
 * @return {JQuery} findTheEndOfIssue :: JQuery -> JQuery
 */
const findTheEndOfIssue = $$.find ('.ghx-end');

/**
 * Finds extra fields content of a single issue, compacts it and prepends to a target element
 * @param {JQuery} issue JIRA .js-issue node
 * @return {JQuery} compactAndMoveExtraFieldsContent :: JQuery -> JQuery
 */
const compactAndMoveExtraFieldsContent = issue =>
    $$.toFound ('.ghx-extra-field-content') (pipe (
        $$.addClass ('aui-label'),
        $$.toParent (pipe (
            $$.removeClass ('ghx-extra-field'),
            $$.prependTo (findTheEndOfIssue (issue))
        ))
    )) (issue);

/**
 * Finds Epic and Version elements and prepends to a target element
 * @param {JQuery} issue JIRA .js-issue node
 * @return {JQuery} moveEpicAndVersion :: JQuery -> JQuery
 */
const moveEpicAndVersion = issue =>
    $$.toFound ('.ghx-end .aui-label') ($$.prependTo (findTheEndOfIssue (issue))) (issue);

/**
 * Finds extra fields, appends them to a target element and compacts the issue
 * @param {JQuery} issue JIRA .js-issue element
 * @return {JQuery} moveExtraFieldsAndCompactIssue :: JQuery -> JQuery
 */
const moveExtraFieldsAndCompactIssue = issue =>
    $$.toFound ('.ghx-plan-extra-fields') (pipe (
        $$.toParent (
            $$.append (findTheEndOfIssue (issue))
        ),
        $$.removeMe
    )) (issue);

/**
 * Removes extra items with None value
 * @return {JQuery} removeExtraItemsWithNoneValue :: JQuery -> JQuery
 */
const removeExtraItemsWithNoneValue = $$.remove ('span.ghx-extra-field-content:contains(None)');

/**
 * Marks issue as processed by adding css class JIRAfaCompacted
 * @return {JQuery} markIssueAsProcessed :: JQuery -> JQuery
 */
const markIssueAsProcessed = $$.addClass ('JIRAfaCompacted');

/**
 * Makes epic work as a toggle filter button for epics
 * @param {JQuery} issue JIRA .js-issue element
 * @returns {JQuery} makeEpicAFilter :: JQuery -> JQuery
 */
const makeEpicAFilter = issue =>
    $$.toFound ('span[data-epickey]') (
        $$.onClick (event => GH.EpicView.toggleFiltering (
            $ (`<span data-epic-key="${$$.getAttr ('data-epickey') ($ (event.target))}"></span>`)) || false
        )
    ) (issue);

/**
 * Processes a single backlog issue making it more compact
 * @return {JQuery} compactIssue :: JQuery -> JQuery
 */
const compactIssue = pipe (
    moveEpicAndVersion,
    compactAndMoveExtraFieldsContent,
    moveExtraFieldsAndCompactIssue,
    makeEpicAFilter,
    markIssueAsProcessed
);

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
 * @returns {compactBacklogIssues} makeBacklogIssuesAlwaysCompact :: () -> (a -> b)
 */
const makeBacklogIssuesAlwaysCompact = () =>
    log ('Backlog issues will always be compact.') &&
    pipe (id, onBacklogDrawn, onBacklogUpdated) (compactBacklogIssues);

export {
    makeBacklogIssuesAlwaysCompact
};