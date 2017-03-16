/*
Accessing Node.js API's in Electron's Renderer process
This file will be required in index.html
*/

console.log('renderer.js is connected');

// importing dialog using electron remote - allows access in renderer process
const {dialog} = require('electron').remote

// function to delete a book, uses electron's message box
deleteBookPrompt = () => {
       
    return(
        dialog.showMessageBox({
            title:"Deleting Book",
            message: "Type the full name of the book to confirm you want to delete it",
            detail: "This process can NOT be reversed",
            buttons: ['yes', 'cancel']
        })
    )    
   
}