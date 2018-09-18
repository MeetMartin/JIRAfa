import {log} from '../utilities/logger.js';
import {pipe} from '../utilities/functional-programming.js';
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
 * @return {JQuery} makeEpicAFilter :: JQuery -> JQuery
 */
const makeEpicAFilter = issue =>
    $$.toFound ('span[data-epickey]') (
        $$.onClick (event => GH.EpicView.toggleFiltering (
            $ (`<span data-epic-key="${$$.getAttr ('data-epickey') ($ (event.currentTarget))}"></span>`)) || false
        )
    ) (issue);

/**
 * Opens a new tab based on given url
 * @param {String} url url to be opened
 * @returns {Window} openIssueInNewTab :: String -> Window
 */
const openIssueInNewTab = url => window.open (url, '_blank');

/**
 * Makes issue details open on double click on an issue in backlog
 * @return {JQuery} openIssueOnDoubleClick :: JQuery -> JQuery
 */
const openIssueOnDoubleClick =
    $$.onDoubleClick (
        event => openIssueInNewTab (pipe ($$.find ('.js-key-link'), $$.getAttr ('href')) ($ (event.currentTarget))
    ));

/**
 * Opens an issue in a new tab based on a click on its key in backlog
 * @return {JQuery} openIssueOnItsKeyClick :: JQuery -> JQuery
 */
const openIssueOnItsKeyClick =
    $$.toFound ('.js-key-link') ($$.onClick (
        event => openIssueInNewTab ($$.getAttr ('href') ($ (event.currentTarget)))
    ));

/**
 * Makes sure that detail view is not getting opened in backlog however link is working
 * @return {Boolean} blockIssueDetail :: () -> Boolean
 */
const blockIssueDetail = () => (GH.PlanController.updateDetailsView = () => null) && true;

/**
 * Removes detail view section from DOM
 * @returns {JQuery} removed element
 */
const removeDetailViewDiv = () => $$.removeMe ($ ('#ghx-detail-view'));

/**
 * Processes a single backlog issue making it more compact
 * @return {JQuery} compactIssue :: JQuery -> JQuery
 */
const compactIssue = pipe (
    moveEpicAndVersion,
    compactAndMoveExtraFieldsContent,
    moveExtraFieldsAndCompactIssue,
    makeEpicAFilter,
    openIssueOnDoubleClick,
    openIssueOnItsKeyClick,
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
const compactBacklogIssues = () =>
    (issues =>
        issues.length > 0
            ?
                log (issues.length + ' of issues was compacted in backlog.') &&
                removeDetailViewDiv () &&
                removeExtraItemsWithNoneValue (issues).each ((index, issue) => compactIssue ($ (issue))) &&
                issues
            :
                issues
    ) (issuesToProcess ());

/**
 * Makes backlog issues always compact
 * @return {compactBacklogIssues} makeBacklogIssuesAlwaysCompact :: () -> (a -> b)
 */
const makeBacklogIssuesAlwaysCompact = () =>
    log ('Backlog issues will always be compact.') &&
    blockIssueDetail () &&
    compactBacklogIssues () &&
    pipe (onBacklogDrawn, onBacklogUpdated) (compactBacklogIssues);

export {
    makeBacklogIssuesAlwaysCompact
};