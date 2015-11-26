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
            $.prettyIcon.top = $.prettyTitle.bottom = config.paddings.vertical;
        }

        if (config.paddings.horizontal !== undefined) {
            $.prettyTitle.left = $.prettyTitle.right = config.paddings.horizontal;
            if (args.title === undefined) {
                $.prettyIcon.left = $.prettyIcon.right = config.paddings.horizontal;
            }
        }

        /* Space between title and icon */
        if (config.paddings.inner !== undefined && args.title !== undefined) {
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
        $.prettyItem.width = config.width;

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
        $.prettyItem.borderWidth = config.border.width !== undefined ? 
            config.border.width :
            $.prettyItem.borderWidth;
        $.prettyItem.borderRadius = config.border.radius !== undefined ?
            config.border.radius : 
            $.prettyItem.borderRadius;
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

    if (config.layout === "horizontal" && args.title !== undefined) {
        $.prettyContainer.layout = "horizontal"; 

        var innerPadding = $.prettyTitle.top,
            verticalPadding = $.prettyIcon.top,
            horizontalPadding = $.prettyTitle.left,
            d = Ti.Platform.displayCaps.logicalDensityFactor, 
            iconHeight = $.prettyIcon.toImage().height / (OS_ANDROID ? d : 1);
            titleHeight= $.prettyTitle.toImage().height / (OS_ANDROID ? d : 1);

        if (iconHeight > titleHeight) {
            $.prettyTitle.height = iconHeight;
        } else {
           $.prettyIcon.height = titleHeight;
        }

        $.prettyIcon.top = $.prettyIcon.bottom = verticalPadding;
        $.prettyTitle.top = $.prettyTitle.bottom = verticalPadding;
        $.prettyIcon.right = innerPadding;
        $.prettyIcon.left = horizontalPadding;
        $.prettyTitle.left = 0;


        if (config.alignment !== undefined && config.alignment.inner !== undefined) {
            if (config.alignment.inner === "left") { $.prettyContainer.left =  0; }
            else if (config.alignment.inner === "right") { $.prettyContainer.right =  0; }
        }
    }

    if (args.title === undefined) {
        $.prettyTitle.height = 0;
        $.prettyTitle.width = Ti.UI.FILL;
    }
})(arguments[0] || {});

$.prettyItem.addEventListener("touchstart", toggleColors);
$.prettyItem.addEventListener("touchcancel", toggleColors);
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
