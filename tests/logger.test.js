import assert from 'assert';

import {log, error} from '../extension/modules/logger.js';

const fnc = () => true;
const obj = { hello: 'can you hear me?' };

describe ('Logger', () => {
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