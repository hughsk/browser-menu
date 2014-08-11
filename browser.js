var remove    = require('remove-element')
var Emitter   = require('events/')
var xtend     = require('xtend')
var vkey      = require('vkey')
var fs        = require('fs')

module.exports = createMenu

require('insert-css')(
  fs.readFileSync(__dirname + '/style.css', 'utf8')
)

function createMenu(opts) {
  opts = opts || {}
  opts = xtend({
      x: 1
    , y: 1
    , fg: 'white'
    , bg: 'blue'
    , padding: xtend({
        top: 1
      , left: 1
      , right: 1
      , bottom: 1
    }, opts.padding || {})
  }, opts)

  var curr = null
  var list = document.createElement('ul')
  var menu = new Emitter

  menu.setMaxListeners(Infinity)

  var latestLineText = ''
  var latestLine = null
  var items = []

  // methods
  menu.add = add
  menu.reset = reset
  menu.close = close
  menu.write = write
  menu.createStream = createStream

  menu.element = list

  // styles
  list.classList.add('browser-terminal-menu')
  list.style.color = opts.fg
  list.style.backgroundColor = opts.bg

  if ('x' in opts) list.style.left = opts.x + 'em'
  if ('y' in opts) list.style.top  = opts.y + 'em'
  if ('width' in opts) list.style.width = opts.width + 'em'

  var padding = opts.padding
  list.style.paddingTop = padding.top + 'em'
  list.style.paddingLeft = padding.left + 'em'
  list.style.paddingRight = padding.right + 'em'
  list.style.paddingBottom = padding.bottom + 'em'

  // keybindings
  var keys = {
      '<up>': prev
    , '<left>': prev
    , 'H': prev
    , 'K': prev
    , '<down>': next
    , '<right>': next
    , 'J': next
    , 'L': next
    , '<space>': select
    , '<enter>': select
    , 'Q': close
    , '<tab>': next
  }

  window.addEventListener('keydown', keydown, false)
  menu.once('close', function() {
    window.removeEventListener('keydown', keydown, false)
  })

  return menu

  // behavior
  function add(text) {
    var item = document.createElement('li')
    latestLine = null
    latestLineText = ''

    items.push(item)
    list.appendChild(item)
    item.innerHTML = text
    item.addEventListener('mouseover', mouseover, false)
    item.addEventListener('click', click, false)

    return menu.once('close', function() {
      item.removeEventListener('mouseover', mouseover, false)
      item.removeEventListener('click', click, false)
    })

    function mouseover(e) {
      if (curr !== null) {
        disable(items[curr])
        curr = null
      }

      enable(item)
      curr = items.indexOf(item)
    }

    function click() {
      curr = items.indexOf(item)
      select()
    }
  }

  function enable(item) {
    item.style.backgroundColor = opts.fg
    item.style.color = opts.bg
  }

  function disable(item) {
    item.style.color = opts.fg
    item.style.backgroundColor = opts.bg
  }

  function next() {
    if (curr !== null) {
      disable(items[curr])
      curr += items.length + 1
      curr %= items.length
    } else {
      curr = 0
    }

    enable(items[curr])
  }

  function prev() {
    if (curr !== null) {
      disable(items[curr])
      curr += items.length - 1
      curr %= items.length
    } else {
      curr = items.length - 1
    }

    enable(items[curr])
  }

  function select() {
    if (curr === null) return
    if (!items[curr]) return
    var label = items[curr].innerHTML
    menu.emit('select', label, curr)
  }

  function reset() {
    document.body.appendChild(list)
  }

  function close() {
    remove(menu.element)
    menu.emit('close')
  }

  function write(text) {
    if (!latestLine) {
      latestLine = document.createElement('li')
      latestLine.classList.add('non-item')
      list.appendChild(latestLine)
    }

    latestLineText += text
    latestLine.innerHTML =
    latestLineText.replace(/\s+$/g, '')
  }

  function keydown(e) {
    if (e.metaKey) return
    var key = vkey[e.keyCode] || e.char
    if (e.shiftKey) {
      if (key === '<tab>') {
        key = '<up>'
      } else {
        return
      }
    }

    if (e.ctrlKey) {
      if (key !== 'C') return
      return close()
    }

    if (!keys[key]) return
    keys[key]()
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  // just for completeness...
  function createStream() {
    var e = new Emitter
    e.pipe = function(){}
    return e
  }
}
