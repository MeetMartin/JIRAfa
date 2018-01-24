import assert from 'assert';

import {getGH} from './mocks/grass-hopper.mock.js';
import {getDocument} from './mocks/document.mock.js';
import {getWindow} from './mocks/window.mock.js';

import {isGHAvailable, addJIRAfaEventEmitters, onPopState, onBacklogShown, onBacklogDrawn, onBacklogUpdated,
    onActiveSprintsUpdated, onActiveViewChanged,getActiveView} from '../extension/modules/jira-event-manager.js';

beforeEach (() => {
    global.GH = getGH ();
    global.document = getDocument ();
    global.window = getWindow ();
    global.Event = global.window.Event;
});

describe ('Jira Event Manager', () => {
    describe ('isGHAvailable', () => {
        it ('should be false if GrassHopper objects are missing', () => {
            delete global.GH;
            assert.deepStrictEqual (isGHAvailable (), false);
        });
        it ('should be true if GrassHopper objects are present', () => {
            assert.deepStrictEqual (isGHAvailable (), true);
        });
    });

    describe ('addJIRAfaEventEmitters', () => {
        it ('emitters should be activated', () => {
            addJIRAfaEventEmitters ();
            const onpopstate = global.document.eventListeners.get ('jirafa-onpopstate');
            assert.deepStrictEqual (onpopstate.length, 1);
            assert.deepStrictEqual (typeof onpopstate [0], 'function');
            assert.deepStrictEqual (GH.BacklogView.draw (), 'draw');
            assert.deepStrictEqual (GH.PlanController.show (), 'show');
            assert.deepStrictEqual (GH.PlanDragAndDrop.enableDragAndDrop (), 'enableDragAndDrop');
            assert.deepStrictEqual (GH.WorkController.setPoolData ('I am data'), 'setPoolData: I am data');
        });
    });

    describe ('onPopState', () => {
        it ('should call its handler with pop state event', done => {
            addJIRAfaEventEmitters ();
            onPopState (done);
            global.window.onpopstate ();
        });
    });

    describe ('onBacklogShown', () => {
        it ('should call its handler when GH.PlanController.show is called', done => {
            addJIRAfaEventEmitters ();
            onBacklogShown (done);
            global.GH.PlanController.show ();
        });
    });

    describe ('onBacklogDrawn', () => {
        it ('should call its handler when GH.BacklogView.draw is called', done => {
            addJIRAfaEventEmitters ();
            onBacklogDrawn (done);
            global.GH.BacklogView.draw ();
        });
    });

    describe ('onBacklogUpdated', () => {
        it ('should call its handler when GH.PlanDragAndDrop.enableDragAndDrop is called', done => {
            addJIRAfaEventEmitters ();
            onBacklogUpdated (done);
            global.GH.PlanDragAndDrop.enableDragAndDrop ();
        });
    });

    describe ('onActiveSprintsUpdated', () => {
        it ('should call its handler when GH.WorkController.setPoolData is called', done => {
            addJIRAfaEventEmitters ();
            onActiveSprintsUpdated (done);
            GH.WorkController.setPoolData ();
        });
    });

    describe ('onActiveViewChanged', () => {
        it ('should call its handler with pop state event as page url changes', done => {
            addJIRAfaEventEmitters ();
            onActiveViewChanged (done);
            global.window.location = 'https://domain.tld/secure/RapidBoard.jspa?rapidView=1234&view=planning.nodetail';
            global.window.onpopstate ();
        });
    });

    describe ('getActiveView', () => {
        it ('should return Unknown by default and on unrecognized urls', done => {
            addJIRAfaEventEmitters ();
            assert.deepStrictEqual (getActiveView (), 'Unknown');
            global.window.location = 'https://domain.tld/secure/RapidBoard.jspa?rapidView=1234&view=planning.nodetail';
            global.window.onpopstate ();
            onActiveViewChanged (() => {
                assert.deepStrictEqual (getActiveView (), 'Unknown');
                done ();
            });
            global.window.location = 'https://domain.tld/nonsense';
            global.window.onpopstate ();
        });

        it ('should return Backlog if url contains "rapidView" and "view=planning"', done => {
            addJIRAfaEventEmitters ();
            onActiveViewChanged (() => {
                assert.deepStrictEqual (getActiveView (), 'Backlog');
                done ();
            });
            global.window.location = 'https://domain.tld/secure/RapidBoard.jspa?rapidView=1234&view=planning.nodetail';
            global.window.onpopstate ();
        });

        it ('should return Reports if url contains "rapidView" and "view=reporting"', done => {
            addJIRAfaEventEmitters ();
            onActiveViewChanged (() => {
                assert.deepStrictEqual (getActiveView (), 'Reports');
                done ();
            });
            global.window.location = 'https://domain.tld/secure/RapidBoard.jspa?rapidView=1234&view=reporting';
            global.window.onpopstate ();
        });

        it ('should return Active Sprints if url contains "rapidView" but not "view=reporting" or "view=planning"', done => {
            addJIRAfaEventEmitters ();
            onActiveViewChanged (() => {
                assert.deepStrictEqual (getActiveView (), 'Active Sprints');
                done ();
            });
            global.window.location = 'https://domain.tld/secure/RapidBoard.jspa?rapidView=1234';
            global.window.onpopstate ();
        });

        it ('should return Open Issue if url contains "browse" but not "rapidView"', done => {
            addJIRAfaEventEmitters ();
            onActiveViewChanged (() => {
                assert.deepStrictEqual (getActiveView (), 'Open Issue');
                done ();
            });
            global.window.location = 'https://domain.tld/browse/JIRAFA-1';
            global.window.onpopstate ();
        });
    });
});