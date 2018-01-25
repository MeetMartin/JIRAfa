const getDocument = () => {
    const eventListeners = new Map ();
    const addEventListener = (event, handler) => eventListeners.has (event) ?
        eventListeners.set (event, eventListeners.get (event).concat ([handler])) :
        eventListeners.set (event, [handler]);
    const dispatchEvent = event => eventListeners.has (event.name) &&
        eventListeners.get (event.name).forEach (handler => handler ());
    return { eventListeners, addEventListener, dispatchEvent };
};

export {
    getDocument
};