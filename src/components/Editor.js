// importing react and component
import React, {Component} from 'react';

// importing quill editor
import Quill from 'quill';
// let Quill = require('quill')
// console.log(quill)

// importing axios
import axios from 'axios';

// creating Editor component
class Editor extends Component {
  constructor() {
    super();

    this.state = {
      books: ''
    }
  }



  // initializing quill when component mounts
  componentDidMount() {
    // rendering editor
  let quill = new Quill('#editor', {
    // theme - includes toolbar
    theme: 'snow',
    placeholder: 'Enter some text'
  });

  // setting quill to state - had issues accessing it in render
  this.setState({
    quill:quill,
    // books: this.props.book
  })
  console.log('get length', quill.getLength())

}

// adding edit form content
addContent(chapterContent, characterCount) {
  /* Adding a Book. Posting to Firebase */
    /*
     will need function to update state of books in app.js after new book added
     or rerun fetch books request
     */
     const uid = this.props.userId;
     // posting to chapters endpoint
    const url = `https://build-a-book.firebaseio.com/users/${uid}/books/${this.props.bookKey}/chapters/${this.props.chapterTitle}/content/.json`;
    // posting content and character count
    axios.post(url, {
      content: chapterContent,
      characters: characterCount
    })
    .then( (response) => {
      alert('chapter has been saved')
      // updating state of books after new book is added
      // this.props.getBooks();
      // setting add book form's state to false - rendering all books view
      // this.toggleAddBook();

    })
    .catch( (error) => {
      console.log('error posting new book', error)
    })

  }


  render() {
    // setting this.props to book for readability
    const book = this.props;
    // console.log('quill',this.state.quill)
    // console.log('quill',quill)
    return (
      <div id="textEditor">
        {/* Chapter Title - passed down from props */}
        <h1>Editor <br />{book.chapterTitle}</h1>
        {/* Printing title from props */}

        {/* Quill container */}
        <div id="editor">

        </div>

        <button className="uk-button-success" onClick={
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

        <button className="uk-button-danger"onClick={book.toggleTextEditor}>Close Editor</button>
        <button onClick={book.toggleChapterView}>View All Chapter</button>
        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Editor;
