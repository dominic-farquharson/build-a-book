# Build A Book

## Landing Page
![image1](/public/assets/image1.png)
## Books Page
![image2](/public/assets/image2.png)
## Book's Chapters Page
![image3](/public/assets/image3.png)
## Chapter's Individual Editor
![image4](/public/assets/image4.png)



#### [Wireframe](#)
#### [User Stories (Trello)](https://trello.com/b/VvIPePGl/build-a-book)
# Desktop Builds - Current (Version 2.1.1)
 - [Windows v2.01](https://drive.google.com/open?id=0B_fEKxl-bFyNa0JJUUZ3VHhtNjg)
 - [Mac v2.0.1](https://drive.google.com/open?id=0B_fEKxl-bFyNTHBwdVpJQkhCS00)
 - [Linux v1.0](#)

# Description:

If you look over any web developer's shoulder, while they're in the midst of a project, you will see a minimum of about 20 tabs open. You ask that person, if they really need them all, there answer is always a resounding yes.

Build-A-Book is a tool for writers. Writers, much like web developers, draw from multiple sources as they develop a book. Drawing from multiple websites, documents and images can be distracting.

Build-A-Book, inspired, by Scriviner, a writing tool, allows writers to stay in one environment. The resources section allows a user to package relevant video's or images by the chapter's title. Allowing a user to stay in one environment gives them more time to focus on writing.

# Installation Instructions:

1. Clone or download repo.
    1. Or if you'd like to just test it out. Click on the relevant build above to download the compiled version.
1. All of the needed dependencies are included within the package.json.
1. Run npm install in root of project folder.
    1. Make sure the latest version of Node is installed.
1. After it is installed, use the **npm run start** script to start the app.
1. If you intend to make changes to the app and would like those changes to update the app w/o having to manually restart electron. Open a new tab in your terminal and run **npm run watch**.
    1. This script will execute Webpack.
1. To load React dev tools: open a new tab in your terminal and execute the **npm run devtools** script.
    1. React dev tools were also included as a dependency


#Technologies Used:

- React.js
- Electron
- Electron-React boilerplate 
- Webpack
- ES6 Classes
- UI Kit
- Dotenv-webpack
- Sass, Sass-loader
- React dev tools - for electron
- Firebase API
- Axios
- Quill.js

Sample Code: Posting Chapter's data to firebase
```javascript
  // Saving Edited Chapter Info
  updateChapterInfo(title, description) {
    // Key of book where chapter is located
    let bookKey = this.props.bookKey; 
    // key of chapter to be edited
    let chapterKey = this.props.chapterKey; 

    // object containing new chapter title and description
    let chapter = {title, description}
    // User Id
    const uid = this.props.userId;
    // endpoint of book to be edited
    let endpoint = `/users/${uid}/books/${bookKey}/chapters/${chapterKey}`;
    // Updating book
    let updatedChapter = firebase.database().ref(endpoint).update(chapter)
      // promise 
      .then( ()=> {
        // notifying user
        alert('Chapter has been successfully edited.')
        // Closing Chapter Edit - toggling edit state to false
        this.toggleChapterEdit();
      })
  }
```

# Future Improvements:

- Statistics section- showing word count of chapters and books using D3.
 - Or file version/edit history.
- Resources section. Lists image or video related to chapter.
- Ability to change password.
- Custom book cover. - added in v2.1.2
- Facebook oauth
- Styling.

# Project Issues:

- Should've fully planned out components hierarchy before starting. Constantly had to refactor code when I realized I needed something  passed down as a prop to be accessible in another component.
- Webpack Configuration to allow for live reloading of Electron after changes are made
    - Configuring Sass loader for Webpack.
- Setting up Firebase Auth.
- Setting up JSON structure
    - I initially had a sample  user JSON file that I was using to test static data. I had to refactor it to make the data easier to navigate.
- Trying to access Node api's outside of Electron's main process.

# Known Issues:

- When creating a chapter inside of a blank book, create chapter must be selected twice before state is properly toggled. -fixed(3/18)
  - When retrieving the user's list of chapters, I set a condition for users who had no chapters to be immediately sent to the Add Chapter component, which only   rendered when its state was set to true. But when the Add Chapter form is rendered in this manner(when a user first creates a book and has no chapters), its   state is never set to true and pressing close would toggle the state to now be true which caused it to open again.  This was fixed by passing the book's       data down as a prop and if it was undefined the state would be set to true. 

- Refreshing the page logs out the user. - fixed (3/10/17).
  - The issue stemmed from the user's auth status not being checked when the app component mounted. Added firebase auth state method to check user's sign in status.
- Formatting (Bold text, bullet points, etc) from the Quill.js editor is not saved with the user's chapter data. - fixed (3/25/17)
  - I was originally using Quill's getText method to save the editor contents and post it to firebase. This saves the text with no formatting. I am now using Quill's getContent method which saves text and formatting.

# About Current Version

The Endpoint is now protected and I am no longer using Axios to GET/POST data. If you attempt to post content using the deployed versions the access will be denied. The current version is now using the Firebase API to GET/POST data.. I will soon update the deployed links with the newest version.

# Acknowledgements:

Special thanks to my instructors and classmates. Without their support this wouldn't have been possible. Also Stack overflow.
