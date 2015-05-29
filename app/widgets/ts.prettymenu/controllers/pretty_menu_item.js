/* Some info we might need about conf; Could be done for each conf param */
$.fontSizeConfigured = false;
$.iconSizeConfigured = false;
$.borderColorConfigured = false;

(function(args) {
    /* Extract args and hydrate the view */
    $.prettyIcon.text = String.fromCharCode(args.icon);
    $.prettyTitle.text = args.title;

    /* The safer the better */
    var handler = function(callback, id) {
        return function() {
            callback(id);
        };
    }(args.onClick, args.id);

    $.getView().addEventListener("click", handler);

    /* Ho boy, let's configure it */
    var config = args.config;

    /* Space between title and bottom; and icon and top*/
    if (config.outerPadding !== undefined) {
        $.prettyIcon.top = $.prettyTitle.bottom = config.outerPadding;
    }

    /* Space between title and icon */
    if (config.innerPadding !== undefined) {
        $.prettyTitle.top = config.innerPadding;
    }

    /* Space between two items */
    if (config.horizontalMargin !== undefined) {
        $.prettyItem.left = $.prettyItem.right = config.horizontalMargin / 2;
    }

    if (config.font !== undefined) {
        $.fontSizeConfigured = config.font.fontSize !== undefined;
        $.prettyTitle.font = config.font;
    }

    if (config.iconSize !== undefined) {
        $.iconSizeConfigured = true;
        $.prettyIcon.font = {
            fontSize: config.iconSize,
            fontFamily: $.prettyIcon.font.fontFamily
        };
    }

    if (config.width !== undefined) {
        $.prettyScaler.width = config.width;

        if (!$.fontSizeConfigured) {
            $.prettyTitle.font = {
                fontSize: config.width / 10,
                fontFamily: $.prettyTitle.font.fontFamily
            };
        }

        if (!$.iconSizeConfigured) {
            $.prettyIcon.font = {
                fontSize: config.width / 3,
                fontFamily: $.prettyIcon.font.fontFamily
            };
        }
    }

    if (config.noBorder) {
        $.prettyItem.borderWidth = 0;
    }

    if (config.border !== undefined) {
        $.borderColorConfigured = config.border.color;
        $.prettyItem.borderColor = config.border.color || $.prettyItem.borderColor;
        $.prettyItem.borderWidth = config.border.width || $.prettyItem.borderWidth;
        $.prettyItem.borderRadius = config.border.radius || $.prettyItem.borderRadius;
    }

    if (config.foregroundColor !== undefined) {
        $.prettyIcon.color = $.prettyTitle.color = config.foregroundColor;
        if (!$.borderColorConfigured) {
            $.prettyItem.borderColor = config.foregroundColor;
        }
    }

    
    if (config.backgroundColor !== undefined) {
        $.prettyIcon.backgroundColor = $.prettyTitle.backgroundColor = $.prettyItem.backgroundColor = config.backgroundColor;
    }

    if (args.title === undefined) {
        $.prettyTitle.height = 0;
    }
})(arguments[0] || {});

$.prettyItem.addEventListener("touchstart", toggleColors);
$.prettyItem.addEventListener("touchend", toggleColors);
function toggleColors() {
    /* Just hide the element to avoid tint */
    $.prettyTitle.opacity = $.prettyIcon.opacity = 0;

    $.prettyItem.backgroundColor = $.prettyTitle.color;
    $.prettyTitle.color = $.prettyIcon.backgroundColor;
    $.prettyTitle.backgroundColor = $.prettyItem.backgroundColor;
    $.prettyIcon.color = $.prettyTitle.color;
    $.prettyIcon.backgroundColor = $.prettyTitle.backgroundColor;
    $.borderColorConfigured || ($.prettyItem.borderColor = $.prettyTitle.color);

    /* Once colors have been toggled, display again the element, quickly. */
    var animation = Ti.UI.createAnimation({
        opacity: 1,
        duration: 150
    });

    $.prettyTitle.animate(animation);
    $.prettyIcon.animate(animation);
}
