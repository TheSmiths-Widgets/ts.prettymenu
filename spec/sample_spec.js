this._ = Alloy._; this.Backbone = Alloy.Backbone;

var prettyMenus, widget, spyHandler;

function retrieveRows(widget, index) {
    return index === undefined 
        ? widget.getView().getChildren() 
        : widget.getView().getChildren()[index];
}

function retrieveItem(widget, row, item) {
    return retrieveRows(widget, row).getChildren()[item];
}

function retrieveTitle(item) {
    return retrieveContainer(item).getChildren()[1];
}

function retrieveIcon(item) {
    return retrieveContainer(item).getChildren()[0];
}

function retrieveContainer(item) {
    return item.getChildren()[0];
}

function retrieveIconCode(widget, item) {
    var iconCode = retrieveIcon(item).text.charCodeAt(0);
    return _.find(_.pairs(widget.icons), function(pair) {
        return pair[1] === iconCode;
    })[0];
}

describe("The pretty menu should be pretty-initialized", function() {
    beforeEach(function() {
        spyHandler = {
            handler: function(id) {
                "Will not be called anyway ... ";
            }
        };
        spyOn(spyHandler, "handler");
        prettyMenus = {
            classic: [ {
                id: "1",
                icon: "android",
                title: "item1",
                onClick: spyHandler.handler
            }, {
                id: "2",
                icon: "windows",
                title: "item2",
                onClick: spyHandler.handler
            }, {
                id: "3",
                icon: "apple",
                title: "item3",
                onClick: spyHandler.handler
            }, {
                id: "4",
                icon: "github",
                title: "item4",
                onClick: spyHandler.handler
            }, {
                id: "5",
                icon: "bitbucket",
                title: "item5",
                onClick: spyHandler.handler
            }, {
                id: "6",
                icon: "facebook",
                title: "item6",
                onClick: spyHandler.handler
            } ],
            noTitle: [ {
                id: "1",
                icon: "apple",
                onClick: spyHandler.handler
            }, {
                id: "2",
                icon: "apple",
                onClick: spyHandler.handler
            } ],
            noId: [ {
                icon: "android",
                title: "item1",
                onClick: spyHandler.handler
            }, {
                icon: "windows",
                title: "item2",
                onClick: spyHandler.handler
            } ],
            noIcon: [ {
                id: "1",
                title: "item1",
                onClick: spyHandler.handler
            }, {
                id: "2",
                title: "item2",
                onClick: spyHandler.handler
            } ],
            noHandler: [ {
                id: "1",
                icon: "android",
                title: "item1"
            }, {
                id: "2",
                icon: "windows",
                title: "item2"
            } ],
            longTitle: [ {
                id: "1",
                icon: "android",
                title: "A quite long title for the first item",
                onClick: spyHandler.handler
            }, {
                id: "2",
                icon: "windows",
                title: "And almost the same for the second one",
                onClick: spyHandler.handler
            } ]
        };
        widget = Alloy.createWidget("ts.prettymenu");
        spyOn(widget, "DEFAULT_HANDLER");
    });
    afterEach(function() {
        widget = null;
    });
    describe("The pretty menu can handle a lot of different pretty menu items", function() {
        it("can be initialized with nothing", function() {
            expect(function() {
                widget.init();
            }).not.toThrow();
            expect(widget.getView()).not.toBeNull();
            expect(retrieveRows(widget)).not.toContain(jasmine.any(Object));
        });
        it("can be initialized without conf", function() {
            expect(function() {
                widget.init(prettyMenus.classic);
            }).not.toThrow();
            expect(widget.getView()).not.toBeNull();
            expect(retrieveRows(widget)).toContain(jasmine.any(Object));
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).text).toEqual(prettyMenus.classic[0].title);
            runs(function() {
                firstItem.fireEvent("click");
            });
            var now = Date.now(), delay = 2500;
            waitsFor(function() {
                return Date.now() - now > delay;
            }, "the click event to be triggered", 2 * delay);
            runs(function() {
                expect(spyHandler.handler).toHaveBeenCalledWith(prettyMenus.classic[0].id);
            });
        });
        it("can be initialized without item's title", function() {
            expect(function() {
                widget.init(prettyMenus.noTitle);
            }).not.toThrow();
            expect(widget.getView()).not.toBeNull();
            expect(retrieveRows(widget)).toContain(jasmine.any(Object));
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).text).toBeFalsy();
            expect(retrieveTitle(firstItem).height).toEqual(0);
        });
        it("can be initialized without item's icon", function() {
            expect(function() {
                widget.init(prettyMenus.noIcon);
            }).not.toThrow();
            expect(widget.getView()).not.toBeNull();
            expect(retrieveRows(widget)).toContain(jasmine.any(Object));
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveIconCode(widget, firstItem)).toEqual(widget.DEFAULT_ICON);
        });
        it("can be initialized without item's handler", function() {
            expect(function() {
                widget.init(prettyMenus.noHandler);
            }).not.toThrow();
            expect(widget.getView()).not.toBeNull();
            expect(retrieveRows(widget)).toContain(jasmine.any(Object));
            var firstItem = retrieveItem(widget, 0, 0);
            runs(function() {
                firstItem.fireEvent("click");
            });
            var now = Date.now(), delay = 2500;
            waitsFor(function() {
                return Date.now() - now > delay;
            }, "the click event to be triggered", 2 * delay);
            runs(function() {
                expect(widget.DEFAULT_HANDLER).toHaveBeenCalledWith(prettyMenus.noHandler[0].id);
                expect(spyHandler.handler).not.toHaveBeenCalled();
            });
        });
        it("can be initialized without item's id", function() {
            expect(function() {
                widget.init(prettyMenus.noId);
            }).not.toThrow();
            expect(widget.getView()).not.toBeNull();
            expect(retrieveRows(widget)).toContain(jasmine.any(Object));
            var firstItem = retrieveItem(widget, 0, 0);
            runs(function() {
                firstItem.fireEvent("click");
            });
            var now = Date.now(), delay = 2500;
            waitsFor(function() {
                return Date.now() - now > delay;
            }, "the click event to be triggered", 2 * delay);
            runs(function() {
                expect(spyHandler.handler).toHaveBeenCalledWith(widget.DEFAULT_ID);
            });
        });
    });
    describe("And it's all the same for configurations", function() {
        it("can handle the number of element per row", function() {
            var perRow = 2;
            widget.init(prettyMenus.classic, {
                perRow: perRow
            });
            expect(retrieveRows(widget).length).toEqual(Math.floor(prettyMenus.classic.length / perRow));
            expect(retrieveRows(widget, 0).getChildren().length).toEqual(perRow);
            perRow = prettyMenus.classic.length - 1;
            widget = Alloy.createWidget("ts.prettymenu");
            widget.init(prettyMenus.classic, {
                perRow: perRow
            });
            expect(retrieveRows(widget).length).toEqual(2);
            expect(retrieveRows(widget, 0).getChildren().length).toEqual(perRow);
            expect(retrieveRows(widget, 1).getChildren().length).toEqual(1);
        });
        it("can handle a vertical padding", function() {
            var config = {
                paddings: { vertical: 14 },
                width: 140
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).bottom).toEqual(config.paddings.vertical);
            expect(retrieveIcon(firstItem).top).toEqual(config.paddings.vertical);
            expect(firstItem.width).toEqual(config.width);
        });
        it("can handle an horizontal padding", function() {
            var config = {
                paddings: { horizontal: 14 },
                width: 140
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).right).toEqual(config.paddings.horizontal);
            expect(retrieveTitle(firstItem).left).toEqual(config.paddings.horizontal);
            expect(firstItem.width).toEqual(config.width);
        });
        it("can handle an inner padding", function() {
            var config = {
                paddings: { inner: 14 },
                width: 140
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).top).toEqual(config.paddings.inner);
            expect(firstItem.width).toEqual(config.width);
        });
        it("can handle a vertical margin", function() {
            var config = {
                margins: { vertical: 14 }
            };
            widget.init(prettyMenus.classic, config);
            var firstRow = retrieveRows(widget, 0);
            expect(firstRow.top).toEqual(config.margins.vertical / 2);
            expect(firstRow.bottom).toEqual(config.margins.vertical / 2);
        });
        it("can handle an horizontal margin", function() {
            var config = {
                margins: { horizontal: 14 }
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(firstItem.left).toEqual(config.margins.horizontal / 2);
            expect(firstItem.right).toEqual(config.margins.horizontal / 2);
        });
        it("can handle a font", function() {
            var config = {
                font: {
                    fontSize: 14,
                    fontFamily: "Arial"
                }
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).font).toEqual(config.font);
        });
        it("can handle an icon size", function() {
            var config = {
                iconSize: 14
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveIcon(firstItem).font.fontSize).toEqual(config.iconSize);
        });
        it("can handle a width", function() {
            var config = {
                width: 140
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);

            expect(firstItem.width).toEqual(config.width);
            expect(retrieveTitle(firstItem).font.fontSize).toEqual(config.width / 10);
            expect(retrieveIcon(firstItem).font.fontSize).toEqual(config.width / 3);

            widget = Alloy.createWidget("ts.prettymenu");
            config.width = 14;
            widget.init(prettyMenus.longTitle, config);
            firstItem = retrieveItem(widget, 0, 0);

            expect(firstItem.width).toEqual(config.width);

            config = {
                width: 140,
                font: {
                    fontSize: 10
                }
            };
            widget = Alloy.createWidget("ts.prettymenu");
            widget.init(prettyMenus.classic, config);
            firstItem = retrieveItem(widget, 0, 0);

            expect(firstItem.width).toEqual(config.width);
            expect(retrieveTitle(firstItem).font.fontSize).toEqual(config.font.fontSize);
        });
        it("can handle a border", function() {
            var config = {
                border: {
                    width: 14,
                    color: "green",
                    radius: 14
                }
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(firstItem.borderColor).toEqual(config.border.color);
            expect(firstItem.borderWidth).toEqual(config.border.width);
            expect(firstItem.borderRadius).toEqual(config.border.radius);
        });
        it("can handle a foreground color", function() {
            var config = {
                foregroundColor: "green"
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).color).toEqual(config.foregroundColor);
            expect(retrieveIcon(firstItem).color).toEqual(config.foregroundColor);
            expect(firstItem.borderColor).toEqual(config.foregroundColor);
        });
        it("can handle a background color", function() {
            var config = {
                backgroundColor: "green"
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).backgroundColor).toEqual(config.backgroundColor);
            expect(retrieveIcon(firstItem).backgroundColor).toEqual(config.backgroundColor);
            expect(firstItem.backgroundColor).toEqual(config.backgroundColor);
        });
        it("can handle a layout orientation", function() {
            var config = {
                layout: "horizontal",
                paddings: {
                    inner: 14,
                    vertical: 140,
                    horizontal: 42
                },
                width: 140
            };

            widget.init(prettyMenus.classic, config);

            var firstItem = retrieveItem(widget, 0, 0);
            expect(retrieveTitle(firstItem).right).toEqual(config.paddings.horizontal);
            expect(retrieveIcon(firstItem).left).toEqual(config.paddings.horizontal);
            expect(retrieveIcon(firstItem).right).toEqual(config.paddings.inner);
            expect(retrieveTitle(firstItem).top).toEqual(config.paddings.vertical);
            expect(retrieveTitle(firstItem).bottom).toEqual(config.paddings.vertical);
            expect(retrieveIcon(firstItem).top).toEqual(config.paddings.vertical);
            expect(retrieveIcon(firstItem).bottom).toEqual(config.paddings.vertical);
            
            var density = Titanium.Platform.displayCaps.logicalDensityFactor;
                iconHeight = retrieveIcon(firstItem).toImage().height,
                titleHeight = retrieveIcon(firstItem).toImage().height;

            if (Titanium.Platform.name === "android") {
                iconHeight /= density;
                titleHeight /= density;
            }

            expect(iconHeight).toEqual(titleHeight);
            expect(firstItem.width).toEqual(config.width);
        });
        

    });

    describe("The menu also comes with special default behavior", function () {
        it("Resize the icon and the title when only a width is supplied", function () {
            var config = {
                width: 140
            };

            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0),
                density = Ti.Platform.displayCaps.logicalDensityFactor;

            expect(retrieveTitle(firstItem).font.fontSize).toEqual(config.width / 10);
            expect(retrieveIcon(firstItem).font.fontSize).toEqual(config.width / 3);

            config = {
                width: 140,
                font: {
                    fontSize: 10
                }
            };

            widget = Alloy.createWidget("ts.prettymenu");
            widget.init(prettyMenus.classic, config);
            firstItem = retrieveItem(widget, 0, 0);

            expect(firstItem.width).toEqual(config.width);
            expect(retrieveTitle(firstItem).font.fontSize).toEqual(config.font.fontSize);

        });
    });

    describe("Each item is quite fancy when you tap on it", function() {
        it("should toggle colors while beeing pressed", function() {
            var config = {
                foregroundColor: "green",
                backgroundColor: "red"
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            runs(function() {
                firstItem.fireEvent("touchstart");
            });
            var now = Date.now(), delay = 2500;
            waitsFor(function() {
                return Date.now() - now > delay;
            }, "colors to change", delay * 2);
            runs(function() {
                expect(firstItem.backgroundColor).toEqual(config.foregroundColor);
                expect(retrieveTitle(firstItem).backgroundColor).toEqual(config.foregroundColor);
                expect(retrieveIcon(firstItem).backgroundColor).toEqual(config.foregroundColor);
                expect(firstItem.borderColor).toEqual(config.backgroundColor);
                expect(retrieveTitle(firstItem).color).toEqual(config.backgroundColor);
                expect(retrieveIcon(firstItem).color).toEqual(config.backgroundColor);
            });
        });
        it("should recover initial colors once the item has been press", function() {
            var config = {
                foregroundColor: "green",
                backgroundColor: "red"
            };
            widget.init(prettyMenus.classic, config);
            var firstItem = retrieveItem(widget, 0, 0);
            runs(function() {
                firstItem.fireEvent("touchstart");
            });
            var now = Date.now(), delay = 2500, fired = false;
            waitsFor(function() {
                if (!fired && Date.now() - now > delay) {
                    fired = true;
                    firstItem.fireEvent("touchend");
                }
                return Date.now() - now > 2 * delay;
            }, "colors to change", delay * 3);
            runs(function() {
                expect(firstItem.backgroundColor).toEqual(config.backgroundColor);
                expect(retrieveTitle(firstItem).backgroundColor).toEqual(config.backgroundColor);
                expect(retrieveIcon(firstItem).backgroundColor).toEqual(config.backgroundColor);
                expect(firstItem.borderColor).toEqual(config.foregroundColor);
                expect(retrieveTitle(firstItem).color).toEqual(config.foregroundColor);
                expect(retrieveIcon(firstItem).color).toEqual(config.foregroundColor);
            });
        });
    });
});
