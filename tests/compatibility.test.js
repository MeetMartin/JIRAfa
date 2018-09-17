import assert from 'assert';

import {getGH} from './mocks/grass-hopper.mock.js';

import {
    isGHAvailable,
    isJIRACompatible
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
});