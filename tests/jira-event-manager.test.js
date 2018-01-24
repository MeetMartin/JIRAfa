import assert from 'assert';

import {isGHAvailable, addJIRAfaEventEmitters} from '../extension/modules/jira-event-manager.js';

const getGH = () => {
    return {
        BacklogView: {},
        PlanController: {
            show: () => 'show'
        },
        PlanDragAndDrop: {},
        WorkController: {}
    };
};

global.GH = getGH ();
global.window = {
    location: 'https://jira.tld/secure/RapidBoard.jspa?rapidView=1205&selectedIssue=SHORT-5049&sprint=6676',
    onpopstate: () => null
};
global.document = {
    eventListeners: new Map (),
    addEventListener: (event, handler) => {
        if (global.document.eventListeners.has (event))  {
            const previous = global.document.eventListeners.get (event);
            global.document.eventListeners.set (event, previous.push (handler));
        } else {
            global.document.eventListeners.set (event, [handler]);
        }
    },
    dispatchEvent: event => global.document.eventListeners.get (event).forEach (handler => handler ())
};

describe ('Jira Event Manager', () => {
    describe ('isGHAvailable', () => {
        it ('should be false if GrassHopper objects are missing', () => {
            delete global.GH;
            assert.deepStrictEqual (isGHAvailable (), false);
        });
        it ('should be true if GrassHopper objects are present', () => {
            global.GH = getGH ();
            assert.deepStrictEqual (isGHAvailable (), true);
        });
    });

    describe ('addJIRAfaEventEmitters', () => {
        it ('emitters should be activated', () => {
            global.document.eventListeners = new Map ();
            addJIRAfaEventEmitters ();
            const onpopstate = global.document.eventListeners.get ('jirafa-onpopstate');
            assert.deepStrictEqual (onpopstate.length, 1);
            assert.deepStrictEqual (typeof onpopstate [0], 'function');
        });
    });
});