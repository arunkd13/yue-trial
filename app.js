const fs = require('fs')
const path = require('path')
const gui = require('gui')

const win = gui.Window.create({})

const menu = gui.MenuBar.create([
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                onClick: () => gui.MessageLoop.quit()
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'copy' },
            { role: 'paste' }
        ]
    }
])

if (process.platform == 'darwin')
    gui.app.setApplicationMenu(menu)
else
    win.setMenuBar(menu)

const contentView = gui.Container.create()
contentView.setStyle({flexDirection: 'row'})
win.setContentView(contentView)

const sidebar = gui.Container.create()
sidebar.setStyle({padding: 5})
contentView.addChildView(sidebar)

const open = gui.Button.create('')
const p = fs.realpathSync(path.join(__dirname, 'eopen@2x.png'))
open.setImage(gui.Image.createFromPath(p))
open.setStyle({marginBottom: 5})
sidebar.addChildView(open)

sidebar.setStyle({width: sidebar.getPreferredSize()}.width)

const edit = gui.TextEdit.create()
edit.setStyle({flex: 1})
contentView.addChildView(edit)

win.onClose = () => gui.MessageLoop.quit()
win.setContentSize({width: 400, height: 400})
win.center()
win.activate()

if (!process.versions.yode && !process.versions.electron) {
    gui.MessageLoop.run()
    process.exit(0)
}