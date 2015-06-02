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
    if (config.paddings !== undefined) {
        if (config.paddings.vertical !== undefined) {
            $.prettyContainer.top = $.prettyContainer.bottom = config.paddings.vertical;
        }

        if (config.paddings.horizontal !== undefined) {
            $.prettyContainer.left = $.prettyContainer.right = config.paddings.horizontal;
        }

        /* Space between title and icon */
        if (config.paddings.inner !== undefined) {
            $.prettyTitle.top = config.paddings.inner;
        }
    }

    /* Space between two items */
    if (config.margins !== undefined) {
        if (config.margins.horizontal !== undefined) {
            $.prettyItem.left = $.prettyItem.right = config.margins.horizontal / 2;
        }
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

    if (config.layout !== undefined && config.layout === "horizontal") {
        $.prettyContainer.layout = "horizontal"; 

        var innerPadding = $.prettyTitle.top,
            d = Ti.Platform.displayCaps.logicalDensityFactor, 
            iconHeight = $.prettyIcon.toImage().height / (OS_ANDROID ? d : 1);
            titleHeight= $.prettyTitle.toImage().height / (OS_ANDROID ? d : 1);

        if (iconHeight > titleHeight) {
            $.prettyTitle.height = iconHeight;
        } else {
            $.prettyIcon.height = titleHeight;
        }

        $.prettyIcon.top = $.prettyTitle.top = 0;
        $.prettyIcon.right = innerPadding;

        if (config.alignment !== undefined) {
            if (config.alignment === "left") { $.prettyContainer.left = 0; }
            else if (config.alignment === "right") { $.prettyContainer.right = 0; }
        }
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
