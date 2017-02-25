/*
File responsible for displaying GUI
*/

// creating app
const app = require('app');
/// importing Browser window
const BrowserWindow = require('browser-window');

require('crash-reporter').start();

// invoked when app is closed
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
  mainWindow.openDevTools();
  // closing app
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
