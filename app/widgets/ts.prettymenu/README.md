[![Appcelerator
Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/)
[![Appcelerator
Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)
[![License](http://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](http://choosealicense.com/licenses/apache-2.0/)
[![Travis](https://api.travis-ci.org/TheSmiths-Widgets/ts.prettymenu.svg)](https://travis-ci.org/TheSmiths-Widgets/ts.prettymenu/)

## Pretty Menu
This widget can be used to insert fancy menus in an app window. It's possible to define a menu as an
icon and a title. All icons are provided by [FontAwesome](https://fontawesome.io/icons) font; Refer
to their documentation to find which icon is available.

## How to install
- `gittio install ts.prettymenu` or simply `git clone https://thesmiths-widgets/ts.prettymenu`
- Then, copy the content of the assets folder into yours to install fonts

## Previews 

![screenshot](https://github.com/thesmiths-widgets/ts.prettymenu/blob/doc/images/screenshot.png)

## How to use
Please, refer to the [documentation](https://thesmiths-widgets.github.io/ts.prettymenu) for more
details and options.

**index.js**

```javascript

function handleClick (id) {
    Ti.API.alert("Menu " + id + "clicked!");
}

$.prettyMenu.init(
    [
        { id: "menu:profile", icon: "fa-eye", title: "Mon profil", onClick: handleClick },
        { id: "menu:question", icon: "fa-question", title: "Questions", onClick: handleClick },
        { id: "menu:help", icon: "fa-help", title: "Aide", onClick: handleClick },
        { id: "menu:logout", icon: "fa-flag-o", title: "Deconnexion", onClick: handleClick }
    ], {
        horizontalMargin: 10,
        perRow: 2,
        verticalMargin: 10,
        width: 100
    }
);

```

**index.xml**

```xml

<Alloy>
    <Window>
        <Widget src="ts.prettymenu" id="prettyMenu" />
    </Window>
</Alloy>

```

[![wearesmiths](http://wearesmiths.com/media/logoGitHub.png)](http://wearesmiths.com)
