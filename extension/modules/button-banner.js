import {log} from '../utilities/logger.js';
import {pipe, id} from '../utilities/functional-programming.js';
import * as $$ from '../utilities/functional-jquery.js';
import {onActiveViewChanged, getActiveView} from './event-manager.js';
import {createSprintsButton} from './sprints-button.js';
import {createEpicsButton} from "./epics-button.js";

const viewIntoClassMap = new Map ([
    ['Backlog', 'jirafa-display-backlog'],
    ['Active Sprints', 'jirafa-active-sprints'],
    ['Reports', 'jirafa-display-reports']
]);

/**
 * Converts Agile view name into class name
 * @param {String} result previous result
 * @param {String} view views Backlog | Active Sprints | Reports
 * @returns {String} viewIntoClass :: (String, String) -> String
 */
const viewIntoClass = (result, view) => (
        map => map.has (view) ? result + ' ' + map.get (view) : result
    ) (viewIntoClassMap);

/**
 * Displays buttons depending on active Agile view
 * @returns {JQuery} updateButtonsBasedOnAgileView :: () -> JQuery
 */
const updateButtonsBasedOnAgileView = () =>
    $$.hide ($ ('.jirafa-display-backlog, .jirafa-display-active-sprints, .jirafa-display-reports')) &&
    (
        activeView => map => map.has (activeView) && $$.show ($ ('.' + map.get (activeView)))
    ) (getActiveView (String (window.location))) (viewIntoClassMap);

/**
 * Attaches button banner to JIRA DOM into #ghx-controls for all Agile views
 * @returns {JQuery} attachButtonBannerToJIRA :: () -> JQuery
 */
const attachButtonBannerToJIRA = () => $$.prependTo ('#ghx-controls') (
    $ ('<div id="jirafa-button-banner" class="ghx-controls-list">' +
    '<dl class="ghx-controls-filters">' +
    '<dt style="text-transform:none;">JIRAfa:</dt>' +
    '</dl></div>'));

/**
 * Adds button to the button banners
 * @param {Array<String>} views Backlog | Active Sprints | Reports
 * @returns {JQuery} addButton :: [String] -> JQuery -> JQuery -> JQuery
 */
const addButton = views => button => buttonBanner => pipe (
    $$.setAttr ('class') ($$.getAttr ('class') (button) + ' ' + views.reduce (viewIntoClass, '').substr (1)),
    $$.appendTo ($$.find ('.ghx-controls-filters') (buttonBanner))
) (button) && buttonBanner;

/**
 * Adds button banner to JIRA
 * @returns {null} () -> String
 */
const activateButtonBanner = () =>
    pipe (
        attachButtonBannerToJIRA,
        addButton (['Backlog']) (createSprintsButton ()),
        addButton (['Backlog']) (createEpicsButton ())
    ) () &&
    pipe (id, onActiveViewChanged) (updateButtonsBasedOnAgileView) &&
    log ('JIRAfa button banner added.');

export {
    activateButtonBanner
};