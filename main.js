/*
File responsible for displaying GUI
*/

//For Dev
// creating app
const app = require('app');
/// importing Browser window
const BrowserWindow = require('browser-window');

require('crash-reporter').start();

// // invoked when app is closed
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// on app startup
app.on('ready', function() {
  // creating a new window (chromium) with inital area of 1000 by 800
  mainWindow = new BrowserWindow({width: 1000, height: 800});

  // file to be loaded (index.html) located in the public folders
  mainWindow.loadUrl('file://' + __dirname + '/public/index.html');

  // invoking devtools method for debugging
  // mainWindow.openDevTools();
  // closing app
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// for deploying 
//const electron = require('electron')
// // Module to control application life.
// const app = electron.app
// // Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow

// const path = require('path')
// const url = require('url')

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let mainWindow

// function createWindow () {
//   // Create the browser window.
//   mainWindow = new BrowserWindow({width: 1000, height: 600})

//   // and load the index.html of the app.
//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'public/index.html'),
//     protocol: 'file:',
//     slashes: true
//   }))

//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()

//   // Emitted when the window is closed.
//   mainWindow.on('closed', function () {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null
//   })
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)

// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// })
