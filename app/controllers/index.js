$.options = {
    "systems": {
        items: [
            {title: "Apple", icon: "fa-apple"},
            {title: "Windows", icon: "fa-windows"},
            {title: "Linux", icon: "fa-linux"}
        ], config: {
            foregroundColor: "#7C8C0A",
            margins: { vertical: 5, horizontal: 5 },
            paddings: { inner: 10, vertical: 5 },
            iconSize: 40,
            font: { fontSize: 16 },
            width: 80,
            perRow: 3
        }
    },

    "media": {
        items: [
            {title: "LinkedIn", icon: "fa-linkedin"},
            {title: "Facebook", icon: "fa-facebook"},
            {title: "Twitter", icon: "fa-twitter"},
            {title: "Google Plus", icon: "fa-google-plus"}
        ], config: {
            backgroundColor: "#999999",
            foregroundColor: "#E2E2E2",
            margins: { vertical: 15, horizontal: 15 },
            paddings: { inner: 10, vertical: 15, horizontal: 15 },
            iconSize: 40,
            font: { fontSize: 12 },
            width: 100,
            perRow: 2
        }
    },

    "currency": {
        items: [
            {title: "Euro", icon: "fa-euro"},
            {title: "Dollar", icon: "fa-dollar"},
            {title: "Pound", icon: "fa-gbp"},
            {title: "BitCoin", icon: "fa-bitcoin"}
        ], config: {
            backgroundColor: "#1DB7FF",
            border: { color: "#1DB7FF" },
            foregroundColor: "#FFFFFF",
            layout: "horizontal",
            alignment: { inner: "left" },
            margins: { vertical: 1},
            paddings: { inner: 10, vertical: 10, horizontal: 25 },
            iconSize: 20,
            font: { fontSize: 14 },
            width: 200,
        }
    
    }


}

function loadConfig() {
    var options = $.options[$.selection.value];
    if (options === undefined) { return; }

    var prettyMenu = Alloy.createWidget("ts.prettymenu");
    prettyMenu.init(options.items, options.config);
    $.preview.removeAllChildren();
    $.preview.add(prettyMenu.getView());
}

$.index.open();
