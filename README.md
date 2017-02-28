# Build A Book

## Landing Page
![image1](/public/assets/image1.png)
## Books Page
![image2](/public/assets/image2.png)
## Book's Chapters Page
![image3](/public/assets/image3.png)
## Chapter's Individual Editor
![image4](/public/assets/image4.png)



[Wireframe](#)
[Trello](#)

# Description:

If you look over any web developer's shoulder, while they're in the midst of a project, you will see a minimum of about 20 tabs open. You ask that person, if they really need them all, there answer is always a resounding yes.

Build-A-Book is a tool for writers. Writers, much like web developers, draw from multiple sources as they develop a book. Drawing from multiple websites, documents and images can be distracting.

Build-A-Book, inspired, by Scriviner, a writing tool, allows writers to stay in one environment. The resources section allows a user to package relevant video's or images by the chapter's title. Allowing a user to stay in one environment gives them more time to focus on writing.

# Installation Instructions:

1. Clone or download repo.
1. All of the needed dependencies are included within the package.json.
1. Run npm install in root of project folder.
    1. Make sure the latest version of Node is installed.
1. After it is installed, use the **npm run start** script to start the app.
1. If you intend to make changes to the app and would like those changes to update the app w/o having to manually restart electron. Open a new tab in your terminal and run **npm run watch**.
    1. This script will execute Webpack.
1. To load React dev tools: open a new tab in your terminal and execute the **npm run devtools** script.
    1. React dev tools were also included as a dependency

Use native numbering
#Technologies Used:

- React.js
- Electron
- Electron-React boilerplate --link
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
  // url for chapter endpoint - based on user's id, the book key, and the chapter's key
  const url = `https://build-a-book.firebaseio.com/users/${this.props.userId}/books/${this.props.bookKey}/chapters/${this.props.chapterKey}.json`;

  // Put request to update chapter endpoint with new chapter title and image
  axios.put(url, {
    // putting title
    title:title,
    // putting description
    description: description
  })
  .then( (response) => {
    console.log(`updated title`);
    // Closing Chapter Edit - toggling edit state to false
    this.toggleChapterEdit();
  })
  .catch( (error) => {
    console.log('error updating title and image')
    this.toggleChapterEdit();
  })

}


```

# Future Improvements:

- Statistics section- showing word count of chapters and books using D3.
- Resources section. Lists image or video related to chapter.

# Project Issues:

- Should've fully planned out components hierarchy before starting. Constantly had to refactor code when I realized I needed something  passed down as a prop to be accessible in another component.
- Webpack Configuration to allow for live reloading of Electron after changes are made
    - Configuring Sass loader for Webpack.
- Setting up Firebase Auth.
- Setting up JSON structure
    - I initially had a sample  user JSON file that I was using to test static data. I had to refactor it to make the data easier to navigate.

# Known Issues:

- When creating a chapter inside of a blank book, create chapter must be selected twice before state is properly toggled.

# Acknowledgements:

Special thanks to my instructors and classmates. Without their support this wouldn't have been possible. Also Stack overflow.
