/**
 * Injects <script type="module" src="main.js"></script> as a ES6 module directly into JIRA DOM.
 *
 * Chrome supports ES6 modules since version 61, however Chrome extensions don't support it directly. This is
 * a workaround to provide full modules support by injecting scripts directly into page DOM through main.js.
 * More on https://medium.com/@martinnovk_22870/using-javascript-es6-import-export-modules-in-chrome-extensions-f63a3a0d2736
 *
 * @returns {null} nothing is returned
 */
const injectMain = () => {
    const script = document.createElement ('script');
    script.setAttribute ("type", "module");
    script.setAttribute ("src", chrome.extension.getURL ('main.js'));
    const head = document.head || document.getElementsByTagName ("head")[0] || document.documentElement;
    head.insertBefore (script, head.lastChild);
};

/**
 * Returns whether the web page is JIRA, based on DOM meta tag. Is is necessary as extension is automatically run on all
 * pages in Chrome.
 *
 * @returns {boolean} true if it's JIRA, false if it's not
 */
const isJIRA = () => $ ('meta[name="application-name"]').attr ('content') === 'JIRA';

if (isJIRA ()) {
    console.log (`%cJIRAfa: JIRA recognized`,'color: #86d8f7')
    // Making possible communication between modules and extension content script
    window.addEventListener ('message', event => {
        if (event.source !== window) return;
        if (event.data.type) {
            console.log (`%cJIRAfa: Message request received in content script, type: ${event.data.type}.`,
                'color: #86d8f7');
            switch (event.data.type) {
                case 'JIRAfa-request-storage':
                    // window.postMessage ({ type: 'JIRAfa-response-storage', content: {something:"baf"} }, '*');
                    break;
                default:
                    console.error ('%cJIRAfa: Unknown message request type.', 'color: #f00');
            }
        }
    });
    injectMain (); // Find all the fun stuff in main.js which is injected as <script type="module">
}