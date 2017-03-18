/*
Accessing Node.js API's in Electron's Renderer process
This file will be required in index.html
*/

console.log('renderer.js is connected');

// importing dialog using electron remote - allows access in renderer process
const {dialog} = require('electron').remote;

// function to delete a book or chapter, uses electron's message box
deletePrompt = (title, message, detail) => {
    // Returns index of button clicked
    return(
        dialog.showMessageBox({
            // messag box title
            title,
            type: 'warning',
            message,
            detail,
            // array containing the names of the buttons
            buttons: ['yes', 'cancel'],
            // index of the button initially selected when message box opens. Set to index of the cancel button
            defaultId: 1,
            // index of the cancel button (redundant since Electron assigns this to button lableled cancel)
            cancelId:1
        })
    )    
}