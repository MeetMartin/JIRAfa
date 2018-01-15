/**
 * Injects <script type="module" src="main.js"></script> as a ES6 module directly into JIRA DOM.
 *
 * Chrome supports ES6 modules since version 61, however Chrome extensions don't support it directly. This is
 * a workaround to provide full modules support by injecting scripts directly into page DOM through main.js.
 * More on https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension
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

if (isJIRA ()) injectMain (); // Find all the fun stuff in main.js which is injected as <script type="module">