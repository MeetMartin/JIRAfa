import * as Test from '../extension/modules/jira-views-manager.js';

import assert from 'assert';

describe ('Jira Views Manager', () => {
    describe ('getActiveView', () => {
        it ('should return Unknown on unrecognized urls', () => {
            assert.deepStrictEqual (Test.getActiveView ('https://domain.tld/nonsense'),
            'Unknown');
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
            assert.deepStrictEqual (Test.getActiveView ('https://domain.tld/browse/JIRAFA-1'),
            'Open Issue');
        });

        it ('should return Report page if url contains "selectedItem=com.atlassian.jira.jira-projects-plugin:report-page" but not "rapidView"', () => {
            assert.deepStrictEqual (Test.getActiveView (
                'https://domain.tld/projects/JIRAFA?selectedItem=com.atlassian.jira.jira-projects-plugin:report-page'),
                'Report Page');
        });

        it ('should return Projects if url contains "projects" but not "rapidView"', () => {
            assert.deepStrictEqual (Test.getActiveView ('https://domain.tld/projects/JIRAFA'),
            'Projects');
        });
    });
});