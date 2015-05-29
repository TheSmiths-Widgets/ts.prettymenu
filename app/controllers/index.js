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
        { id: "menu", icon: "fa-question" }, 
        { id: "menu", icon: "fa-futbol-o" }, 
        { id: "menu", icon: "fa-gamepad" }, 
        { id: "menu", icon: "fa-heart" }, 
        { id: "menu", icon: "fa-cloud" },
        { id: "menu", icon: "fa-train" }, 
        { id: "menu", icon: "fa-bank" }, 
        { id: "menu", icon: "fa-github" }, 
        { id: "menu", icon: "fa-apple" }, 
        { id: "menu", icon: "fa-dlfjgdlfkjg" }
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

function handleClick(clickEvent) {
    Ti.API.warn(clickEvent);
}

$.index.open();
