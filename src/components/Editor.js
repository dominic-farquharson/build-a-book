// importing react and component
import React, {Component} from 'react';

// importing quill editor
import Quill from 'quill';

// importing Firebase
import * as firebase from "firebase";

// importing moment
import moment from 'moment';

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
    // creating toolbar options 
    const toolbarOptions = [
      [{ 'font': [] }], // font family    
      [{ size: [ 'small', false, 'large', 'huge' ]}], // heading size - controlled w/ quill css      
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],  // list level 
      [{ 'color': [] }, { 'background': [] }], 
      [{ 'align': [] }],
      ['image'],
      ['clean'] 
    ];


    // console.log(document.getElementById('editor'), 'initializing')
      let quill = new Quill('#editor', 
        { 
          modules:{ 
            // clipboard
            clipboard: {},
            // adding to tool bar
            toolbar: toolbarOptions,
            // Allowing for user to redo and undo
            history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true,
            }},
            theme: 'snow',
            placeholder: `Type something!`,
          
         });

         // save shortcut
         quill.keyboard.addBinding({ key: 's', ctrlKey: true }, () => {
            // character count
            var length = this.state.quill.getLength();
            // getting text + formatting
            let contents = this.state.quill.getContents();
            // posting chapter data - text data and character count
            this.addContent(contents, length); 
         });

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
      editor.setContents(latestEdit)
      }
  }

  addContent(chapterContent, characterCount) {
  // adding edit form content
      // user's id key
      const uid = this.props.userId;
      // time
      let time =  moment().format('MMMM Do YYYY, h:mm:ss a');

      // object containing new Chapter information
      let chapterData = {
        content: chapterContent,
        characters: characterCount,
        time
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


      // statistics 
      let stats= {};
      // adding time + chapter stats to latest edit endpoint - quick book info
      stats[`users/${uid}/books/${bookKey}/chapters/${chapterKey}/latestEdit`] = {characters: characterCount, time};
      
      // snapShot of edits for Statistics component
      let snapShot = {};
      snapShot[`users/${uid}/books/${bookKey}/latestEdit`] = {time};



      // writing new chapter to chapters endpoint
      firebase.database().ref().update(chapter)
      // adding promise, notifying user on completion of update
      .then( ()=> {
        // Quick snapshot of last chapter edit - writing to root of chapters - quick info of latest edit
        firebase.database().ref().update(stats); 
        // quick snapshot of last book edit - writing to root of book - quick info on the latest edit
        firebase.database().ref().update(snapShot);        
               
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
        {/* Make this neater */}
        <p>Press control s to quickly save</p>

          {/* Close/Back Button */}
          <i 
              className="statsBack fa fa-chevron-circle-left fa-2x" aria-hidden="true" 
              // close button
              onClick={this.props.toggleChapterView}
          ></i>

        {/* SAve Button */}
        <i 
          className=" blue fa fa-floppy-o fa-2x" 
          aria-hidden="true"
          onClick={
            ()=> {
              // character count
              var length = this.state.quill.getLength();
              // getting text + formatting
              let contents = this.state.quill.getContents();
              // posting chapter data - text data and character count
              this.addContent(contents, length);
            }
          }
        ></i> 

        {/*<button className="uk-button-primary editorButton" onClick={
          ()=> {
            // character count
            var length = this.state.quill.getLength();
            // getting text + formatting
            let contents = this.state.quill.getContents();
            // posting chapter data - text data and character count
            this.addContent(contents, length);
           }
          }>
          Save
        </button>*/}
        {/*<button onClick={()=>this.state.quill.history.undo()}>Undo</button>
        <button onClick={()=>this.state.quill.history.redo()}>Redo</button>*/}
        
        {/*<button className="uk-button-danger editorButton" onClick={this.props.toggleChapterView}>Close Editor</button>*/}

        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Editor;
