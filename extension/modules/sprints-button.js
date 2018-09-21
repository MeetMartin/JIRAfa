import {createDropdown} from './button.js';
import {onBacklogUpdated} from './event-manager.js';

/**
 * Populates menu with names of sprints leading to the sprints on the board.
 * @param {JQuery} button
 * @return {JQuery} populateMenu :: JQuery -> () -> JQuery
 */
const populateMenu = button => () => {
    button.clearMenu ();
    $ ('.js-sprint-header .header-left .ghx-name').each ((index, element) => {
        button.addMenuOption ($ (element).text (), () => element.scrollIntoView ());
    });
    button.addMenuOption ('Backlog', () => $ ('div.js-marker-backlog-header').get (0).scrollIntoView ());
    return button;
};

/**
 * Creates jump to sprint button to quickly navigate among sprints in backlog
 * @returns {JQuery} createSprintsButton :: () -> JQuery
 */
const createSprintsButton = () => {
    const button = createDropdown ('Sprints');
    button.addMenuOption ('Loading...', () => null);
    populateMenu (button) ();
    onBacklogUpdated (populateMenu (button));
    return button;
};

export {
    createSprintsButton
};