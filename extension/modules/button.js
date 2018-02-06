/**
 * Sets dropdown menu position depending on parent button and displays it
 * @param {JQuery} menu dropdown menu
 * @param {JQuery} parentButton parent button
 * @returns {JQuery} edited dropdown menu
 */
const showMenu = (menu, parentButton) => {
    const topPosition = parentButton.offset ().top + parentButton.height ();
    const leftPosition = parentButton.offset ().left;
    menu.attr ('style', `display:block;position:absolute;top:${topPosition}px;left:${leftPosition}px;`);
    return menu;
};

/**
 * Adds option to dropwdown menu with correct styling and on click function call
 * @param {JQuery} menu dropdown menu
 * @param {string} item option name
 * @param {function} onclick function to be called on click
 * @returns {JQuery} edited dropdown menu
 */
const addMenuOption = (menu, item, onclick) => {
    const option = $ (`<li><a>${item}</a></li>`);
    option.find ('a')
        .mouseover (event => $ (event.target).addClass ('active aui-dropdown2-active'))
        .mouseout (event => $ (event.target).removeClass ('active').removeClass ('aui-dropdown2-active'));
    option.appendTo (menu.find ('ul'));
    option.click (onclick);
    return menu;
};

/**
 * Creates JQuery menu object with methods addOption and show
 * @returns {JQuery} dropdown menu
 */
const createMenu = () => {
    const menu = $ ('<div class="jirafa-dropdown aui-dropdown2 aui-style-default">' +
        '<div class="aui-dropdown2-section">' +
        '<ul class="aui-list-truncate"></ul>' +
        '</div>' +
        '</div>');
    /**
     * Adds option to dropwdown menu with correct styling and on click function call
     * @param {string} item option name
     * @param {function} onclick function to be called on click
     * @returns {JQuery} edited dropdown menu
     */
    menu.addOption = (item, onclick) => addMenuOption (menu, item, onclick);
    /**
     * Sets dropdown menu position depending on parent button and displays it
     * @param {JQuery} parentButton parent button
     * @returns {JQuery} edited dropdown menu
     */
    menu.show = parentButton => showMenu (menu, parentButton);
    menu.appendTo ('body');
    return menu;
};

/**
 * Hides currently displayed dropdown menu
 * @returns {null} nothing to return
 */
const hideMenu = () => {
    $ ('.jirafa-button a').removeClass ('ghx-active');
    $ ('.jirafa-dropdown').remove ();
};

/**
 * Displays or hides dropdown menu
 * @param {JQuery.Event} event triggering event
 * @param {array<array<string,function>>} menuOptions options for dropdown menu
 * @returns {null} nothing to return
 */
const toggleMenu = (event, menuOptions) => {
    event.stopPropagation ();
    hideMenu ();
    if (!$ (event.target).hasClass ('ghx-active')) {
        $ (event.target).addClass ('ghx-active');
        const menu = createMenu (); // Menu is created every time to make sure it shows current data
        menuOptions.forEach (option => menu.addOption (option[0], option[1]));
        menu.show ($ (event.target).parent ());
        $ (window).click (click => {
            // Dropdown menu should be removed if user click outside of it
            hideMenu ();
            $ (event.target).off (click);
        });
    }
};

/**
 * Creates JQuery object with a button
 * @param {string} text text for the button
 * @returns {JQuery} the button
 */
const createButton = text => $ (`<dd class="jirafa-button"><a role="button">${text}</a></dd>`);

/**
 * Creates JQuery object with a dropdown button with methods clearMenu and addMenuOption
 * @param {string} text text for the dropdown
 * @returns {JQuery} the dropdown
 */
const createDropdown = text => {
    const dropdown = createButton (text + ' ▾');
    dropdown.menuOptions = [];
    /**
     * Clears dropdown menu options
     * @returns {Array} empty array
     */
    dropdown.clearMenu = () => dropdown.menuOptions = [];
    /**
     * Adds option to dropwdown menu with on click function call
     * @param {string} item option name
     * @param {function} onclick function to be called on click
     * @returns {number} index
     */
    dropdown.addMenuOption = (item, onclick) => dropdown.menuOptions.push ([item, onclick]);
    dropdown.click (event => toggleMenu (event, dropdown.menuOptions));
    return dropdown;
};

export {
    createButton,
    createDropdown
};