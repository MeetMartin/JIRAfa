/**
 * Mocks browser document object
 * @returns {{eventListeners: Map<*, array<function>>, addEventListener: function(string=, function=), dispatchEvent: function(string=)}} return mocked document object
 */
const getDocument = () => {
    return {
        eventListeners: new Map (),
        addEventListener: (event, handler) => {
            if (global.document.eventListeners.has (event)) {
                const previous = global.document.eventListeners.get (event);
                global.document.eventListeners.set (event, previous.concat ([handler]));
            } else {
                global.document.eventListeners.set (event, [handler]);
            }
        },
        dispatchEvent: event => {
            return global.document.eventListeners.has (event.name) &&
            global.document.eventListeners.get (event.name).forEach (handler => handler ());
        }
    };
};

export {
    getDocument
};