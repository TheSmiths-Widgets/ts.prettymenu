$.prettyMenu.init(
    [
        { id: "profile", icon: "fa-eye", title: "Mijn profiel", onClick: handleClick },
        { id: "question", icon: "fa-question", title: "Gestelde vragen", onClick: handleClick },
        { id: "help", icon: "fa-info", title: "Help", onClick: handleClick },
        { id: "dunno", icon: "fa-flag-o", title: "UitLoggen", onClick: handleClick  }
    ], { width: 100 }
);


$.prettyMenu2.init(
    [
        { icon: "fa-question" }, 
        { icon: "fa-futbol-o" }, 
        { icon: "fa-gamepad" }, 
        { icon: "fa-heart" }, 
        { icon: "fa-cloud" },
        { icon: "fa-train" }, 
        { icon: "fa-bank" }, 
        { icon: "fa-github" }, 
        { icon: "fa-apple" }, 
        { icon: "fa-dlfjgdlfkjg" }
    ], {
        backgroundColor: "#9ACD32",
        foregroundColor: "#FFFFFF",
        perRow: 5,
        horizontalMargin: 0,
        verticalMargin: 0,
        innerPadding: 0,
        outerPadding: 12.5,
        iconSize: 25,
        width: 50
    }
);

$.prettyMenu3.init(
    [
        { icon: "fa-arrow-up" }, 
        { icon: "fa-arrow-up" }, 
        { icon: "fa-arrow-down" }, 
        { icon: "fa-arrow-down" }, 
        { icon: "fa-arrow-left" }, 
        { icon: "fa-arrow-right" },
        { icon: "fa-arrow-left" }, 
        { icon: "fa-arrow-right" },
        { icon: "fa-bold" }, 
        { icon: "fa-font" }
    ], {
        backgroundColor: "#999999",
        border: { radius: 12 },
        foregroundColor: "#FFFFFF",
        perRow: 10,
        horizontalMargin: 0,
        verticalMargin: 50,
        innerPadding: 0,
        outerPadding: 4,
        iconSize: 15,
        width: 26
    }
);


function handleClick(clickEvent) {
    Ti.API.warn(clickEvent);
}

$.index.open();
