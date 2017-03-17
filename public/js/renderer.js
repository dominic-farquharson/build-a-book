/*
Accessing Node.js API's in Electron's Renderer process
This file will be required in index.html
*/

console.log('renderer.js is connected');

// importing dialog using electron remote - allows access in renderer process
const {dialog} = require('electron').remote;

// function to delete a book, uses electron's message box
deleteBookPrompt = () => {
    // Returns index of button clicked
    return(
        dialog.showMessageBox({
            // messag box title
            title:"Deleting Book",
            type: 'warning',
            message: "Are you sure you want to delete this book?",
            detail: "Note: The book and all of its chapters will be deleted. This process can NOT be reversed",
            // array containing the names of the buttons
            buttons: ['yes', 'cancel'],
            // index of the button initially selected when message box opens. Set to index of the cancel button
            defaultId: 1,
            // index of the cancel button (redundant since Electron assigns this to button lableled cancel)
            cancelId:1
        })
    )    
   
}