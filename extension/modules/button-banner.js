import {log, error} from "./logger.js";
import {onActiveViewChanged, getActiveView} from './jira-event-manager.js';
import {createSprintsButton} from './sprints-button.js';
import {createEpicsButton} from "./epics-button.js";

/**
 * JQuery object of button banner based on JIRA styles
 * @type {JQuery}
 */
const buttonBanner = $ ('<div id="jirafa-button-banner" class="ghx-controls-list">' +
    '<dl class="ghx-controls-filters">' +
        '<dt style="text-transform:none;">JIRAfa:</dt>' +
    '</dl></div>');

/**
 * Converts Agile view name into class name
 * @param {string} result previous result
 * @param {string} view views Backlog | Active Sprints | Reports
 * @returns {string} previous result with new class
 */
const viewIntoClass = (result, view) => {
    switch (view) {
        case 'Backlog':
            return result + ' jirafa-display-backlog';
        case 'Active Sprints':
            return result + ' jirafa-display-active-sprints';
        case 'Reports':
            return result + ' jirafa-display-reports';
        default:
            error ('Unknown Agile view was passed for a button.');
            return result;
    }
};

/**
 * Displays buttons depending on active Agile view
 * @returns {null} nothing to return
 */
const updateButtonsBasedOnAgileView = () => {
    $ ('.jirafa-display-backlog, .jirafa-display-active-sprints, .jirafa-display-reports').hide ();
    switch (getActiveView ()) {
        case 'Backlog':
            $ ('.jirafa-display-backlog').show ();
            break;
        case 'Active Sprints':
            $ ('.jirafa-display-active-sprints').show ();
            break;
        case 'Reports':
            $ ('.jirafa-display-reports').show ();
            break;
        default:
            error ('Unknown Agile view was passed for displaying buttons.');
    }
    log ('Button displays updated.');
};


/**
 * Attaches button banner to JIRA DOM into #ghx-controls for all Agile views
 * @returns {JQuery} button banner
 */
const attachButtonBannerToJIRA = () => buttonBanner.prependTo ('#ghx-controls');

/**
 * Adds button to the button banners
 * @param {array<string>} views Backlog | Active Sprints | Reports
 * @param {function} createButton the button to be added
 * @returns {JQuery} button banner
 */
const addButton = (views, createButton) => {
    const finalButton = createButton ();
    const classes = views.reduce (viewIntoClass, '').substr (1); // Serves to hide and show buttons based on active view
    finalButton.attr ('class', finalButton.attr ('class') + ' ' + classes);
    buttonBanner.find ('.ghx-controls-filters').append (finalButton);
};

/**
 * Adds button banner to JIRA
 * @returns {null} nothing to return
 */
const addButtonBanner = () => {
    addButton (['Backlog'], createSprintsButton);
    addButton (['Backlog'], createEpicsButton);
    attachButtonBannerToJIRA ();
    updateButtonsBasedOnAgileView ();
    onActiveViewChanged (updateButtonsBasedOnAgileView);
    log ('JIRAfa button banner added.');
};

export {
    addButtonBanner
};