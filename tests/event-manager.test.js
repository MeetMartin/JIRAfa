import assert from 'assert';
import proxy from 'proxyquire';

import {getDocument} from './mocks/document.mock.js';
import {getWindow} from './mocks/window.mock.js';

import logger from './mocks/modules/logger.mock.js';

proxy.noCallThru ();
const Test = proxy ('../extension/modules/event-manager.js', { '../utilities/logger.js': logger });

beforeEach (() => {
    global.document = getDocument ();
    global.window = getWindow ();
    global.Event = global.window.Event;
});

afterEach (() => {
    delete global.document;
    delete global.window;
    delete global.Event;
});

describe ('Jira Event Manager', () => {

    describe ('addJIRAfaEventEmitters', () => {
        it ('returns array with 6 emitters', () => {
            assert.deepStrictEqual (Test.addJIRAfaEventEmitters ().length, 6);
            assert.deepStrictEqual (Test.addJIRAfaEventEmitters (), [
                'jirafa-onpopstate',
                'jirafa-url-changed',
                'jirafa-active-view-changed',
                'jirafa-backlog-shown',
                'jirafa-backlog-drawn',
                'jirafa-backlog-updated',
                //'jirafa-active-sprints-updated'
            ]);
        });

        it ('emitters should be activated', () => {
            Test.addJIRAfaEventEmitters ();
            assert.deepStrictEqual (GH.BacklogView.draw (), 'draw');
            assert.deepStrictEqual (GH.PlanController.show (), 'show');
            assert.deepStrictEqual (GH.PlanDragAndDrop.enableDragAndDrop (), 'enableDragAndDrop');
            //assert.deepStrictEqual (GH.WorkController.setPoolData ('I am data'), 'setPoolData: I am data');
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

    /*describe ('onActiveSprintsUpdated', () => {
        it ('should call its handler when GH.WorkController.setPoolData is called', done => {
            Test.addJIRAfaEventEmitters ();
            Test.onActiveSprintsUpdated (done);
            GH.WorkController.setPoolData ();
        });
    });*/
    
});