# browser-menu [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/browser-menu&title=browser-menu&description=hughsk/browser-menu%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

A browser-friendly implementation of [substack](http://github.com/substack)'s
[terminal-menu](http://github.com/substack/terminal-menu) module:

![browser-menu](http://i.imgur.com/lrFcCOf.jpg)

## Usage ##

[![browser-menu](https://nodei.co/npm/browser-menu.png?mini=true)](https://nodei.co/npm/browser-menu)

The API is more or less equivalent to *terminal-menu*:

### `menu = createMenu(opts)`

Create a menu with `opts`:

* `opts.width` - menu width in `em`
* `opts.x` - top-left corner x offset, default: 1
* `opts.y` - top-left corner y offset, default: 1
* `opts.fg` - foreground color, default: 'white'
* `opts.bg` - background color, default: 'blue'
* `opts.padding.left` - left padding in `em`
* `opts.padding.right` - right padding in `em`
* `opts.padding.top` - top padding in `em`
* `opts.padding.bottom` - bottom padding in `em`

The menu can be driven around with the arrow keys and j/k, vi-style. To quit out
of the menu, hit `^C` or `q`.

### `menu.add(label)`

Create a new selectable menu item with the string `label`.

### `menu.write(msg)`

Write a message to the menu.

### `menu.reset()`

Adds the menu to the document. You can also do this yourself, as
`menu.element` points to the DOM node for the menu.

### `menu.close()`

Unregister all listeners and bring everything back to its original state.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/browser-menu/blob/master/LICENSE.md) for details.
