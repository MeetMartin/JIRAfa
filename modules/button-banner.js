import {log} from "./logger.js";
import {onBacklogShown} from './jira-event-manager.js';
import {createJumpToSprintButton} from './jump-to-sprint.js';

/**
 * JQuery object of button banner based on JIRA styles
 * @type {JQuery}
 */
const buttonBanner = $ ('<div id="jirafa-button-banner" class="ghx-controls-list">' +
    '<dl class="ghx-controls-filters">' +
        '<dt style="text-transform:none;">JIRAfa:</dt>' +
    '</dl></div>');

/**
 * Adds button to the button banners
 * @param {JQuery} button the button to be added
 * @returns {JQuery} button banner
 */
const addButton = button => buttonBanner.find ('.ghx-controls-filters').append (button);

/**
 * Attaches button banner to JIRA DOM into #ghx-controls for all Agile views
 * @returns {JQuery} button banner
 */
const attachButtonBannerToJIRA = () => buttonBanner.prependTo ('#ghx-controls');

/**
 * Adds button banner to JIRA
 * @returns {null} nothing to return
 */
const addButtonBanner = () => {
    addButton (createJumpToSprintButton);
    onBacklogShown (attachButtonBannerToJIRA);
    log ('JIRAfa button banner added.');
};

export {
    addButtonBanner
};