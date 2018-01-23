import assert from 'assert';

import {getLogLevel, setLogLevel, log, error} from '../extension/modules/logger.js';

const fnc = () => true;
const obj = { hello: 'can you hear me?' };

describe ('Logger', () => {
    describe ('getLogLevel', () => {
        it ('should be 0 by default', () => {
            assert.deepStrictEqual (getLogLevel (), 0);
        });
        it ('should return new value after its updated by setLogLevel', () => {
            assert.deepStrictEqual (setLogLevel ('log'), 2);
            setLogLevel (0);
        });
        it ('should return original value after setLogLevel is called with invalid argument', () => {
            setLogLevel (1);
            assert.deepStrictEqual (setLogLevel ('nonsense'), 1);
            setLogLevel (0);
        });
    });

    describe ('setLogLevel', () => {
        it ('should return the level passed as a number', () => {
            assert.deepStrictEqual (setLogLevel (2), 2);
            assert.deepStrictEqual (setLogLevel (1), 1);
            assert.deepStrictEqual (setLogLevel (0), 0);
            assert.deepStrictEqual (setLogLevel ('log'), 2);
            assert.deepStrictEqual (setLogLevel ('error'), 1);
            assert.deepStrictEqual (setLogLevel ('none'), 0);
        });
        it ('should return the current level if invalid argument is passed', () => {
            assert.deepStrictEqual (setLogLevel ('nonsense'), 0);
            assert.deepStrictEqual (setLogLevel (3), 0);
            assert.deepStrictEqual (setLogLevel (), 0);
        });
    });

    describe ('log', () => {
        it ('should return any variable passed to it', () => {
            assert.deepStrictEqual (log ('whatever'), 'whatever');
            assert.deepStrictEqual (log (null), null);
            assert.deepStrictEqual (log (), undefined);
            assert.deepStrictEqual (log (fnc), fnc);
            assert.deepStrictEqual (log (obj), obj);
        });
    });

    describe ('error', () => {
        it ('should return any variable passed to it', () => {
            assert.deepStrictEqual (error ('whatever'), 'whatever');
            assert.deepStrictEqual (error (null), null);
            assert.deepStrictEqual (error (), undefined);
            assert.deepStrictEqual (error (fnc), fnc);
            assert.deepStrictEqual (error (obj), obj);
        });
    });
});