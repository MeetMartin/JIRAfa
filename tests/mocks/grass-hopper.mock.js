/**
 * Mocks Atlassian JIRA GrassHopper GH object
 * @returns {{BacklogView: {}, PlanController: {show: function(): string}, PlanDragAndDrop: {}, WorkController: {}}} mocked GH object
 */
const getGH = () => {
    return {
        BacklogView: {
            draw: () => 'draw'
        },
        PlanController: {
            show: () => 'show',
            updateDetailsView: () => 'updateDetailsView'
        },
        PlanDragAndDrop: {
            enableDragAndDrop: () => 'enableDragAndDrop'
        },
        WorkController: {
            setPoolData: data => 'setPoolData: ' + data
        }
    };
};

export {
    getGH
};