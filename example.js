if (process.browser) {
  document.body.style.backgroundColor = '#0D1F2C'
}

createMenu()

function createMenu() {
  var menu = require('./')({
      width: 29
    , x: 4
    , y: 4
    , bg: process.browser ? '#1F8DD6' : 'blue'
    , fg: process.browser ? '#f2f2f2' : 'white'
  })

  menu.reset()
  menu.write('SERIOUS BUSINESS TERMINAL\n')
  menu.write('----------------------------\n')

  var items = []

  items.push('» ADD TRANSACTION INVOICE')
  items.push('» BUSINESS INTELLIGENCE')
  items.push('» ACCOUNTS PAYABLE')
  items.push('» LEDGER BOOKINGS')
  items.push('» INDICATOR CHART METRICS')
  items.push('» BACKUP DATA TO FLOPPY DISK')
  items.push('» RESTORE FROM FLOPPY DISK')

  items.sort(function(a, b) {
    return Math.random() > 0.5 ? -1 : +1
  }).forEach(function(item) {
    menu.add(item)
  })

  menu.write('----------------------------')
  menu.add('» EXIT')

  menu.on('select', function (label) {
    menu.close()
    console.log('SELECTED: ' + label)
    if (label === '» EXIT') return
    createMenu()
  })

  menu.createStream().pipe(process.stdout)
}
