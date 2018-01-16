/**
 * Creates jump to sprint button to quickly navigate among sprints in backlog
 * @returns {JQuery} jump to sprint button
 */
const createJumpToSprintButton = () => {
    return $ ('<a role="button" href="#">Sprints</a>');
};

export {
    createJumpToSprintButton
};