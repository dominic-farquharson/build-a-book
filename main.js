// /*
// File responsible for displaying GUI
// */

// importing electron, setting it to a variable
const electron = require('electron')
// creating app variable
const app = electron.app
// importin BrowserWindow module from Electron
const BrowserWindow = electron.BrowserWindow

// importing path + url
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Creates browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 600})

  // setting directory of index file
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // closing window
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// initializing app
app.on('ready', createWindow)

// closing app
app.on('window-all-closed', function () {
   // window stays active on mac, closes on other platforms
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// starting app
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
