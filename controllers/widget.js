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
$.icons = require(WPATH("icons-fa"));

/** @readonly @property {String} [DEFAULT_ID="default"] The default id used if no one is provided */
$.DEFAULT_ID = "default";
/** @readonly @property {String} [DEFAULT_ICON="fa-remove"] The default icon used if no one is provided */
$.DEFAULT_ICON = "fa-remove";
/** @readonly @property {Function} [DEFAULT_HANDLER=function(){ Ti.API.warn('Menu uninitialized'); }] 
 * The default handler used if no one is provided */
$.DEFAULT_HANDLER = function() {
    Ti.API.warn("Menu uninitialized.");
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
 * @param {Object} config Well... the configuration of the widget. Have fun.
 * @param {String} [config.alignment = "center"] The alignment of the item content; Only available
 * when the layout is set to "horizontal". Available options are "left", "right" and "center".
 * @param {String} [config.backgroundColor="#FFFFFF"] The color of everything
 * that is not mentionned as a foreground element.  
 * @param {Object} [config.border] The item's border.
 * @param {String} [config.border.color = config.border.foregroundColor] The border's color.
 * @param {Number} [config.border.radius = 0] The border's radius.
 * @param {Number} [config.border.width = 1] The border's width.
 * @param {Object} [config.font] The title's font
 * @param {String} [config.font.fontFamily = "Helveticae Neue"] The font's family
 * @param {Number} [config.font.fontSize = 12] The font's size.
 * @param {String} [config.foregroundColor = "#000000"] The titles's and icon's color; Also, if no
 * border's color has been supplied, the border's color. 
 * @param {String} [config.iconSize = 40] The icon's size
 * @param {String} [config.layout = "vertical"] The orientation of the item, "horizontal" or "vertical".
 * @param {Object} [config.margins] Margins around the item
 * @param {Number} [config.margins.horizontal = 0] The space between two items.
 * @param {String} [config.margins.vertical = 0] The space between two rows of item.
 * @param {Object} [config.paddings] Different paddings that could be set on the item
 * @param {Number} [config.paddings.inner = 0] The space between the icon and the title.
 * @param {Number} [config.paddings.vertical = 0] The space from top and bottom borders.
 * @param {Number} [config.paddings.horizontal = 0] The space from left and right borders. 
 * @param {Number} [config.perRow = 1] The number of item to put in one row.
 * @param {Number} [config.width = Ti.UI.SIZE] The width of the item. Also, if no font.fontSize has
 * been supplied, will set the title's fontSize to one tenth of the width. If no iconSize has been
 * supplied, will set the icon's size to one third of the width.
 */ 
function init(menus, config) {
    var row = [];
    menus = menus || [];
    config = config || {};
    config.perRow = config.perRow || 1;

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
        if (config.margins !== undefined && config.margins.vertical !== undefined) {
            rowView.top = rowView.bottom = config.margins.vertical / 2;
        }

        if (config.alignment !== undefined && config.alignment.outer !== undefined) {
            if (config.alignment.outer === "left") {
                rowView.center = null;
                rowView.left = 0;
            } else if (config.alignment.outer === "right") {
                rowView.center = null;
                rowView.right = 0;
            }
        }

        _.each(row, function(menu_item) {
            rowView.add(menu_item);
        });
        container.add(rowView);
        return [];
    }
}




exports.init = init;
