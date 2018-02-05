import {log} from "../utilities/logger.js";
import * as $$ from '../utilities/functional-jquery.js';
import {onActiveViewChanged, getActiveView} from './event-manager.js';
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

const viewIntoClassMap = new Map ([
    ['Backlog', 'jirafa-display-backlog'],
    ['Active Sprints', 'jirafa-active-sprints'],
    ['Reports', 'jirafa-display-reports']
]);

/**
 * Converts Agile view name into class name
 * @param {string} result previous result
 * @param {string} view views Backlog | Active Sprints | Reports
 * @returns {string} previous result with new class
 */
const viewIntoClass = (result, view) => (
        map => map.has (view) ? result + ' ' + map.get (view) : result
    ) (viewIntoClassMap);

/**
 * Displays buttons depending on active Agile view
 * @returns {null} nothing to return
 */
const updateButtonsBasedOnAgileView = () =>
    $$.hide ($ ('.jirafa-display-backlog, .jirafa-display-active-sprints, .jirafa-display-reports')) &&
    (
        activeView => map => map.has (activeView) && $$.show ($ ('.' + map.get (activeView)))
    ) (getActiveView (String (window.location))) (viewIntoClassMap);

/**
 * Attaches button banner to JIRA DOM into #ghx-controls for all Agile views
 * @returns {JQuery} button banner
 */
const attachButtonBannerToJIRA = () => (banner => $$.prependTo ('#ghx-controls', banner)) (buttonBanner);

/**
 * Adds button to the button banners
 * @param {array<string>} views Backlog | Active Sprints | Reports
 * @param {function} createButton the button to be added
 * @returns {JQuery} button banner
 */
const addButton = (views, createButton) => {
    const finalButton = createButton ();
    finalButton.attr ('class', finalButton.attr ('class') + ' ' + views.reduce (viewIntoClass, '').substr (1));
    buttonBanner.find ('.ghx-controls-filters').append (finalButton);
};

/**
 * Adds button banner to JIRA
 * @returns {null} nothing to return
 */
const activateButtonBanner = () => {
    addButton (['Backlog'], createSprintsButton);
    addButton (['Backlog'], createEpicsButton);
    attachButtonBannerToJIRA ();
    updateButtonsBasedOnAgileView ();
    onActiveViewChanged (updateButtonsBasedOnAgileView);
    log ('JIRAfa button banner added.');
};

export {
    activateButtonBanner
};