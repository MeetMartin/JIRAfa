import assert from 'assert';

import {getGH} from './mocks/grass-hopper.mock.js';

import {
    isGHAvailable,
    isJIRACompatible,
    isGHCompatible
} from '../extension/utilities/compatibility.js';

beforeEach (() => {
    global.GH = getGH ();
});

afterEach (() => {
    delete global.GH;
});

describe ('Jira Compatibility Tester', () => {
    describe ('isGHAvailable', () => {
        it ('should be true if GrassHopper object is avaialble', () => {
            assert.deepStrictEqual (isGHAvailable (), true);
        });

        it ('should be false if GrassHopper object is missing', () => {
            delete global.GH;
            assert.deepStrictEqual (isGHAvailable (), false);
        });
    });

    describe ('isJIRACompatible', () => {
        it ('should be true if all functions testing JIRA compatibility return true', () => {
            assert.deepStrictEqual (isJIRACompatible (), true);
        });

        it ('should be false if GH object is missing', () => {
            delete global.GH;
            assert.deepStrictEqual (isJIRACompatible (), false);
        });
    });

    describe ('isGHCompatible', () => {
        it ('should be true if GH.PlanController.show is defined', () => {
            assert.deepStrictEqual (isGHCompatible (), true);
        });

        it ('should be false if GH.PlanController.show is not defined', () => {
            delete global.GH.PlanController.show;
            assert.deepStrictEqual (isGHCompatible (), false);
        });

        it ('should be true if GH.BacklogView.draw is defined', () => {
            assert.deepStrictEqual (isGHCompatible (), true);
        });

        it ('should be false if GH.BacklogView.draw is not defined', () => {
            delete global.GH.BacklogView.draw;
            assert.deepStrictEqual (isGHCompatible (), false);
        });

        it ('should be true if GH.PlanDragAndDrop.enableDragAndDrop is defined', () => {
            assert.deepStrictEqual (isGHCompatible (), true);
        });

        it ('should be false if GH.PlanDragAndDrop.enableDragAndDrop is not defined', () => {
            delete global.GH.PlanDragAndDrop.enableDragAndDrop;
            assert.deepStrictEqual (isGHCompatible (), false);
        });

        it ('should be true if GH.WorkController.setPoolData is defined', () => {
            assert.deepStrictEqual (isGHCompatible (), true);
        });

        it ('should be false if GH.WorkController.setPoolData is not defined', () => {
            delete global.GH.WorkController.setPoolData;
            assert.deepStrictEqual (isGHCompatible (), false);
        });
    });
});