/**
 * Mocks browser window object
 * @returns {{location: string, onpopstate: function(): null}} returns mocked browser window object
 */
const getWindow = () => {
    return {
        location: 'https://domain.tld/',
        onpopstate: () => null,
        Event: class {
            constructor (name) {
                this.name = name;
            }
        }
    };
};

export {
    getWindow
};