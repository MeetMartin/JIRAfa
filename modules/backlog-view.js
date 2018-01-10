'use strict';

/**
 * Returns boolean whether JIRA backlog view is currently available by checking GH objects
 *
 * @impure depends on JIRA native GH object
 * @returns {boolean}
 */
const isBacklogViewAvailable = () => GH && GH.BacklogView && GH.BacklogController;

/**
 * Returns boolean whether JIRA backlog view is currently available & visible on the screen
 *
 * @impure depends on JIRA native GH object
 * @returns {boolean}
 */
const isBacklogViewVisible = () => isBacklogViewAvailable () && GH.BacklogController.visible;

export {
    isBacklogViewAvailable,
    isBacklogViewVisible
};