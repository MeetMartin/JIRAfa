import assert from 'assert';
import proxy from 'proxyquire';

import {getGH} from './mocks/grass-hopper.mock.js';
import {getDocument} from './mocks/document.mock.js';
import {getWindow} from './mocks/window.mock.js';

import logger from './mocks/modules/logger.mock.js';

proxy.noCallThru ();
const Test = proxy ('../extension/modules/event-manager.js', { './logger.js': logger });

beforeEach (() => {
    global.GH = getGH ();
    global.document = getDocument ();
    global.window = getWindow ();
    global.Event = global.window.Event;
});

afterEach (() => {
    delete global.GH;
    delete global.document;
    delete global.window;
    delete global.Event;
});

describe ('Jira Event Manager', () => {
    describe ('isGHAvailable', () => {
        it ('should be false if GrassHopper objects are missing', () => {
            delete global.GH;
            assert.deepStrictEqual (Test.isGHAvailable (), false);
        });
        it ('should be true if GrassHopper objects are present', () => {
            assert.deepStrictEqual (Test.isGHAvailable (), true);
        });
    });

    describe ('addJIRAfaEventEmitters', () => {
        it ('returns array with only one emitter name if GH object is not available', () => {
            delete global.GH;
            assert.deepStrictEqual (Test.addJIRAfaEventEmitters ().length, 2);
            assert.deepStrictEqual (Test.addJIRAfaEventEmitters (), [
                'jirafa-onpopstate',
                'jirafa-active-view-changed'
            ]);
        });

        it ('returns array with 6 emitter names if GH object is available', () => {
            assert.deepStrictEqual (Test.addJIRAfaEventEmitters ().length, 6);
            assert.deepStrictEqual (Test.addJIRAfaEventEmitters (), [
                'jirafa-onpopstate',
                'jirafa-active-view-changed',
                'jirafa-backlog-shown',
                'jirafa-backlog-drawn',
                'jirafa-backlog-updated',
                'jirafa-active-sprints-updated'
            ]);
        });

        it ('emitters should be activated', () => {
            Test.addJIRAfaEventEmitters ();
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
            Test.addJIRAfaEventEmitters ();
            Test.onPopState (done);
            global.window.onpopstate ();
        });
    });

    describe ('onBacklogShown', () => {
        it ('should call its handler when GH.PlanController.show is called', done => {
            Test.addJIRAfaEventEmitters ();
            Test.onBacklogShown (done);
            global.GH.PlanController.show ();
        });
    });

    describe ('onBacklogDrawn', () => {
        it ('should call its handler when GH.BacklogView.draw is called', done => {
            Test.addJIRAfaEventEmitters ();
            Test.onBacklogDrawn (done);
            global.GH.BacklogView.draw ();
        });
    });

    describe ('onBacklogUpdated', () => {
        it ('should call its handler when GH.PlanDragAndDrop.enableDragAndDrop is called', done => {
            Test.addJIRAfaEventEmitters ();
            Test.onBacklogUpdated (done);
            global.GH.PlanDragAndDrop.enableDragAndDrop ();
        });
    });

    describe ('onActiveSprintsUpdated', () => {
        it ('should call its handler when GH.WorkController.setPoolData is called', done => {
            Test.addJIRAfaEventEmitters ();
            Test.onActiveSprintsUpdated (done);
            GH.WorkController.setPoolData ();
        });
    });

    describe ('onActiveViewChanged', () => {
        it ('should call its handler with pop state event as page url changes', done => {
            Test.addJIRAfaEventEmitters ();
            Test.onActiveViewChanged (done);
            global.window.location = 'https://domain.tld/secure/RapidBoard.jspa?rapidView=1234&view=planning.nodetail';
            global.window.onpopstate ();
        });
    });

    describe ('getActiveView', () => {
        it ('should return Unknown on unrecognized urls', () => {
            assert.deepStrictEqual (Test.getActiveView ('https://domain.tld/nonsense'), 'Unknown');
        });

        it ('should return Backlog if url contains "rapidView" and "view=planning"', () => {
            assert.deepStrictEqual (
                Test.getActiveView ('https://domain.tld/secure/RapidBoard.jspa?rapidView=1234&view=planning.nodetail'),
                'Backlog');
        });

        it ('should return Reports if url contains "rapidView" and "view=reporting"', () => {
            assert.deepStrictEqual (
                Test.getActiveView ('https://domain.tld/secure/RapidBoard.jspa?rapidView=1234&view=reporting'),
                'Reports');
        });

        it ('should return Active Sprints if url contains "rapidView" but not "view=reporting" or "view=planning"', () => {
            assert.deepStrictEqual (Test.getActiveView ('https://domain.tld/secure/RapidBoard.jspa?rapidView=1234'),
                'Active Sprints');
        });

        it ('should return Open Issue if url contains "browse" but not "rapidView"', () => {
            assert.deepStrictEqual (Test.getActiveView ('https://domain.tld/browse/JIRAFA-1'), 'Open Issue');
        });
    });
});