import {createDropdown} from './button.js';
import {onBacklogUpdated} from "./event-manager.js";

/**
 * Toggles epic filtering
 * @param {JQuery.Event} event event on menu option clicked
 * @returns {null} nothing to return
 */
const toggleEpicFiltering = event => {
    const selector = `span[title='${$ (event.target).text ()}']`;
    const span = `<span data-epic-key="${$ (selector).attr ('data-epickey')}"></span>`;
    GH.EpicView.toggleFiltering ($ (span));
};

/**
 * Gets a set of all available epics
 * @returns {Set<string>} set of unique epics
 */
const getAllEpics = () => {
    const uniqueEpics = new Set ();
    $ ('.js-issue span[data-epickey]').each ((index, element) => {
        uniqueEpics.add ($ (element).attr ('title'));
    });
    return uniqueEpics;
};

/**
 * Populates menu with names of epics.
 * @param {JQuery} button
 * @return {JQuery} populateMenu :: JQuery -> () -> JQuery
 */
const populateMenu = button => () => {
    button.clearMenu ();
    const uniqueEpics = getAllEpics ();
    for (const epic of uniqueEpics) button.addMenuOption (epic, toggleEpicFiltering);
    return button;
};

/**
 * Creates favorite epics button to quickly navigate to favorite epics
 * @returns {JQuery} jump to sprint button
 */
const createEpicsButton = () => {
    const button = createDropdown ('Epics');
    button.addMenuOption ('Loading...', () => null);
    populateMenu (button) ();
    onBacklogUpdated (populateMenu (button));
    return button;
};

/*window.addEventListener ('message', event => {
    if (event.source !== window) return;
    if (event.data.type && event.data.type === 'JIRAfa-response') {
        alert (event.data.content);
    }
});
window.postMessage ({ type: 'JIRAfa-request', content: 'baf' }, '*');*/

export {
    createEpicsButton
};