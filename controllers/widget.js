/** @class prettymenu
 * This widget display pretty menus as a set of clickable cards. Each card contain a
 * [FontAwesome](http://fontawesome.io/icons) icon and a title. Many parameters are customisable to
 * make the menu look the way you want.
 *
 * The font currently in use has been placed in the `assets/fonts` folder and should be merged with
 * the current `assets` folder of your app.
 *
 * @requires FontAwesome
 */ 

/** @readonly @property {Object} icons The list of correspondances between icons names and their ascii code.*/
$.icons = require(WPATH("fa-icons"));

/** @readonly @property {String} DEFAULT_ID The default id used if no one is provided */
$.DEFAULT_ID = "default";
/** @readonly @property {String} DEFAULT_ICON The default icon used if no one is provided */
$.DEFAULT_ICON = __p.file("fa-remove");
/** @readonly @property {Function} DEFAULT_HANDLER The default handler used if no one is provided */
$.DEFAULT_HANDLER = function() {
    Ti.API.warn("Menu unitialized.");
};

/**
 * @method init
 * Populate the widget with some menu-items. A configuration can be pass and will be applied to every
 * menu item provided.
 * 
 * @param {Object[]} menus A list of menu item; Each item should have the following form:
 * @param {String} [menus.id] An id that will be communicated to the click handler
 * @param {String} [menus.title] The title to be displayed.
 * @param {String} [menus.icon] The icon to display; Use identifier from 
 * [FontAwesome](http://fontawesome.io/icons)
 * @param {Function} [menus.onClick] A click handler
 * @param {String} menus.onClick.id The corresponding menu item id.
 *
 * @param {String} config Well... the configuration of the widget. Have fun.
 * @param {String} config.backgroundColor The color of everything that is not mentionned as a
 * foreground element. 
 * @param {String} config.border The item's border.
 * @param {String} config.border.color The border's color.
 * @param {String} config.border.radius The border's radius.
 * @param {String} config.border.width The border's width.
 * @param {String} config.font The title's font
 * @param {String} config.font.fontFamily The font's family
 * @param {String} config.font.fontSize The font's size.
 * @param {String} config.foregroundColor The titles's and icon's color; Also, if no border's color
 * has been supplied, the border's color. 
 * @param {String} config.iconSize The icon's size
 * @param {String} config.innerPadding The space between the icon and the title.
 * @param {String} config.horizontalMargin The space between two items.
 * @param {String} config.noBorder If true, no border will be displayed.
 * @param {String} config.outerPadding The space from top and bottom borders.
 * @param {String} config.perRow The number of item to put in one row.
 * @param {String} config.verticalMargin The space between two rows of item.
 * @param {String} config.width The width of the item. Also, if no font.fontSize has been supplied,
 * will set the title's fontSize to one tenth of the width. If no iconSize has been supplied, will
 * set the icon's size to one third of the width.
 */ 
function init(menus, config) {
    var row = [];
    menus = menus || [];
    config = config || {};
    config.perRow = config.perRow || 2;

    /* Iterate over every menus if any to add them to the global container */
    _.each(menus, function(menuItemParams) {
        /* Default conf for every item, overwrote by users param */
        var defaultItemParams = {
            config: config,
            id: $.DEFAULT_ID,
            icon: $.icons[$.DEFAULT_ICON],
            onClick: $.DEFAULT_HANDLER
        };
        _.extend(defaultItemParams, menuItemParams);

        /* The item expect an ascii code, let's supply it */
        defaultItemParams.icon = $.icons[defaultItemParams.icon] || $.icons[$.DEFAULT_ICON];

        /* Delegate the creation of each view to Alloy via using a controller for each view. This is
           probably really costly on the moment ... is the controller garbage collected once we've
           retrieved the views ? Should have a deeper look about this. */
        row.push(Widget.createController("pretty_menu_item", defaultItemParams).getView());

        /* Each time we reach the perRow item in a single row, let's add it to the container and
           create a new one */
        row.length === +config.perRow && (row = addRow(row, $.getView()));
    });
    /* Remaining items if any */
    row.length > 0 && addRow(row, $.getView());

    /*
     * This function create a new row, i.e. a Ti.UI.createView to store the given element.
     * 
     * It also returns an empty array as a little sugar for code above
     */
    function addRow(row, container) {
        var rowView = Ti.UI.createView();
        rowView.applyProperties($.createStyle({
            classes: [ "pretty-row" ]
        }));

        /* Apply the configuration */
        if (config.verticalMargin !== undefined) {
            rowView.top = rowView.bottom = config.verticalMargin / 2;
        }

        _.each(row, function(menu_item) {
            rowView.add(menu_item);
        });
        container.add(rowView);
        return [];
    }
}




exports.init = init;
