import {log} from './logger.js';
import {onBacklogDrawn, onBacklogUpdated} from './jira-event-manager.js';

/**
 * Returns the end element of a single backlog issue
 * @param {Node} issue JIRA .js-issue node
 * @returns {Element} JIRA .ghx-end element inside of issue
 */
const findTheEndOfIssue = issue => $ (issue).find ('.ghx-end');

/**
 * Finds extra fields content of a single issue, compacts it and prepends to a target element
 * @param {Node} issue JIRA .js-issue node
 * @returns {Element} adjusted JIRA .ghx-extra-field-content elements
 */
const compactAndMoveExtraFieldsContent = issue =>
    $ (issue).find ('.ghx-extra-field-content')
        .addClass ('aui-label')
        .parent ().removeClass ('ghx-extra-field')
        .prependTo (findTheEndOfIssue (issue));
/**
 * Finds Epic and Version elements and prepends to a target element
 * @param {Node} issue JIRA .js-issue node
 * @returns {Element} JIRA issue epic and version elements
 */
const moveEpicAndVersion = issue => $ (issue).find ('.ghx-end .aui-label').prependTo (findTheEndOfIssue (issue));

/**
 * Finds extra fields, appends them to a target element and compacts the issue
 * @param {Node} issue JIRA .js-issue element
 * @returns {null} since element is removed, nothing is returned
 */
const moveExtraFieldsAndCompactIssue = issue => {
    const extraFields = $ (issue).find ('.ghx-plan-extra-fields');
    extraFields.parent ().append (findTheEndOfIssue (issue));
    extraFields.remove ();
};

/**
 * Removes extra items with None value
 * @param {JQuery} backlogIssues backlog issues where we should perform the changes
 * @returns {JQuery} backlogIssues without extra items
 */
const removeExtraItemsWithNoneValue = backlogIssues =>
    backlogIssues.find ('span.ghx-extra-field-content:contains(None)').remove () && backlogIssues;


/**
 * Compacts UI of all issues in backlog so they are displayed as one line
 * @returns {Promise<JQuery>} Promise with JQuery elements of .js-issue:not(.JIRAfaCompacted)
 */
const compactBacklogIssues = () => {
    const backlogIssues = $ ('.js-issue:not(.JIRAfaCompacted)');
    if (backlogIssues.length > 0) {
        removeExtraItemsWithNoneValue (backlogIssues).each ((index, issue) => {
            moveEpicAndVersion (issue);
            compactAndMoveExtraFieldsContent (issue);
            moveExtraFieldsAndCompactIssue (issue);
            $ (issue).addClass ('JIRAfaCompacted');
        });
        log (backlogIssues.length + ' of issues was compacted in backlog.');
    }
    return backlogIssues;
};

/**
 * Makes backlog issues always compact
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