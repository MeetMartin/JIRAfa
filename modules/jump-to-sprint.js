import {createDropdown} from './button.js';
import {onBacklogUpdated} from './jira-event-manager.js';

/**
 * Creates jump to sprint button to quickly navigate among sprints in backlog
 * @returns {JQuery} jump to sprint button
 */
const createJumpToSprintButton = () => {
    const button = createDropdown ('Sprints');
    button.addMenuOption ('Loading...', () => null);

    /* List of sprints is not available at document ready time and it can change,
       so we need to make sure it's kept updated */
    onBacklogUpdated (() => {
        button.clearMenu ();
        $ ('span[data-fieldname=sprintName]').each ((index, element) => {
            button.addMenuOption ($ (element).attr ('data-fieldvalue'), () => element.scrollIntoView ());
        });
        button.addMenuOption ('Backlog', () => $ ('div.js-marker-backlog-header').get (0).scrollIntoView ());
    });

    return button;
};

export {
    createJumpToSprintButton
};