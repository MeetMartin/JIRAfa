import assert from 'assert';
import proxy from 'proxyquire';
import {JSDOM} from'jsdom';

import logger from "./mocks/modules/logger.mock";
import eventManager from './mocks/modules/event-manager.mock.js';

proxy.noCallThru ();
const Test = proxy ('../extension/modules/backlog-compacter.js',
    { '../utilities/logger.js': logger, './event-manager.js': eventManager });

beforeEach (() => {
    global.window = new JSDOM (`<!DOCTYPE html><p>Hello world</p>`).window;
    global.document = global.window.document;
});

afterEach (() => {
    delete global.window;
    delete global.document;
});
// TODO: how to test this properly?
/*
describe ('Backlog Compacter', () => {
    describe ('makeBacklogIssuesAlwaysCompact', () => {
        it ('should return a function', () => {
            
            assert.deepStrictEqual (typeof Test.makeBacklogIssuesAlwaysCompact (), 'function');
        });
    });
});
*/
