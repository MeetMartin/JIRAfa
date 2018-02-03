import {createDropdown} from './button.js';
import {onBacklogUpdated} from './event-manager.js';

/**
 * Creates jump to sprint button to quickly navigate among sprints in backlog
 * @returns {JQuery} jump to sprint button
 */
const createSprintsButton = () => {
    const button = createDropdown ('Sprints');
    button.addMenuOption ('Loading...', () => null);
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
    createSprintsButton
};