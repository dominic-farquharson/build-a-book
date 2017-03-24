// importing react and component
import React, {Component} from 'react';

// importing quill editor
import Quill from 'quill';

// importing Firebase
import * as firebase from "firebase";

// creating Editor component
class Editor extends Component {
  constructor() {
    super();

    this.state = {
      books: '',
      content: 'Start writing some data and press save to continue at a later time.',

    }

  }

  // initializing quill
  componentDidMount() {
    // setting quill object to variable 
    let quill = this.initializeQuill();
    // settting quill to state for access in render
    this.setState({quill})
    // passing quill object as argument - fetching latest chapter edit
    this.fetchChapterData(quill);   
  }

  initializeQuill() {
    console.log(document.getElementById('editor'), 'initializing')
      let quill = new Quill('#editor', { theme: 'snow',placeholder: `Type something!`})
      return quill;
  }

  // fetching Chapter Data -passing in quill editor as argument
  fetchChapterData(editor) {
      // book object
      const book = this.props.books;
      // key of book that chapter is in
      const bookKey = this.props.bookKey;
      // Key of chapter being edited
      const chapterKey = this.props.chapterTitle;
      // Object containing history of all of the user's edits
      let contentObject = book[bookKey]['chapters'][chapterKey]['content'];
      // Ending Function when user has no chapter data
      if(contentObject === undefined) {
        return;
      }
      // retrieving chapter content - inserting it into quill
      else {
      // Turning into array of keys
      let contentKeys = Object.keys(contentObject);
      // getting index of latest edit
      let length =  contentKeys.length - 1
      // Getting latest edit
      let latestEditKey = contentKeys[length];
      // Setting variable containing latest edit - object containing content/ character count - pulling out just the content for now
      let latestEdit = contentObject[latestEditKey]['content']
      // setting editor contents w/ latest edit
      editor.setContents([{insert: latestEdit}])
      }
  }

  addContent(chapterContent, characterCount) {
  // // // adding edit form content

      // user's id key
      const uid = this.props.userId;
      // object containing new Chapter information
      let chapterData = {
        content: chapterContent,
        characters: characterCount
      }
      // Key of chapter being edited
      let chapterKey = this.props.chapterTitle;
      // key of book containing chapter
      let bookKey = this.props.bookKey;
      // getting new editor key - to allow for histories of edits
      let newEditorKey = firebase.database().ref(`/users/${uid}/books/${bookKey}/chapters/${chapterKey}/content/`).push().key;    
      // chapter data to be posted, initially an empty object
      let chapter = {};
      // pushing new Chapter endpoint into chapter object
      chapter[`users/${uid}/books/${bookKey}/chapters/${chapterKey}/content/${newEditorKey}`] = chapterData;
      // writing new chapter to chapters endpoint
      firebase.database().ref().update(chapter)
      // adding promise, notifying user on completion of update
      .then( ()=> {
        alert('chapter has been Saved')    
      })    
      return;
  }

  render() {
       // book object
      const book = this.props.books;
      // key of book that chapter is in
      const bookKey = this.props.bookKey;
      // Key of chapter being edited
      const chapterKey = this.props.chapterTitle;
      // Title of chapter
      let title = book[bookKey]['chapters'][chapterKey]['title'];
    
    return (
      <div id="textEditor">
   
        {/* Chapter Title */}
        <h1>{title}</h1>
      

        {/* Quill container */}
        <div id="editor"> </div>
  
        <button className="uk-button-primary editorButton" onClick={
          ()=> {
            // grabbing chapter data
            var getText = this.state.quill.getText();
            var length = this.state.quill.getLength();
            // posting chapter data - text data and character count
            this.addContent(getText, length);
            console.log('length', length, 'get Text', getText)
            console.log('saving')}
          }>
          Save
        </button>

        <button className="uk-button-danger editorButton" onClick={this.props.toggleChapterView}>Close Editor</button>

        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Editor;
