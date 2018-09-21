/**
 * Sets active view based on current url
 * @param {String} url url to be checked
 * @return {String} getActiveView :: String -> String
 */
const getActiveView = url =>
    url.includes ('rapidView')
        ?
            url.includes ('view=planning') ? 'Backlog' :
            url.includes ('view=reporting') ? 'Reports' :
            'Active Sprints'
        :
            url.includes ('browse') ? 'Open Issue' :
            url.includes ('selectedItem=com.atlassian.jira.jira-projects-plugin:report-page') ? 'Report Page' :
            url.includes ('projects') ? 'Projects' :
            'Unknown';

export {
    getActiveView
}