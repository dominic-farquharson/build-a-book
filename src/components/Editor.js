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
      books: '',
      content: 'Start writing some data and press save to continue at a later time.'
    }
  }



  // initializing quill when component mounts
  componentDidMount() {

    // rendering editor
  let quill = new Quill('#editor', {
    // theme - includes toolbar
    theme: 'snow',
    placeholder: this.state.content
  });

  // setting quill to state - had issues accessing it in render
  this.setState({
    quill:quill,
    // books: this.props.book
  })
  // fetching Chapter data
  this.fetchChapterData();
  // printing chapter data to quill editor
  // this.printChapters();

  quill.setContents([
  { insert: this.state.content },

]);




  console.log('get length', quill.getLength())

}

// adding edit form content
addContent(chapterContent, characterCount) {
    // user id
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

// fetching chapter data
fetchChapterData() {
  // user id
   const uid = this.props.userId;
   // posting to chapters endpoint
  const url = `https://build-a-book.firebaseio.com/users/${uid}/books/${this.props.bookKey}/chapters/${this.props.chapterTitle}/content/.json`;
  // posting content and character count
  axios.get(url)
  .then( (response) => {
    this.setState({chapter: response.data})
    console.log('retreiving chapter data')
    // this.printChapters();
    const chapter = this.state.chapter;
    if(chapter!== undefined)
    Object.keys(chapter).map ( (key)=> {
      console.log('1', chapter[key]['content'])
      if(chapter[key]['content']===undefined) {
        return;
      }
      console.log('setting chapter datat state')
      this.setState({
        content:chapter[key]['content'],
        characterCount: chapter[key]['characters']
      })
    })
    console.log('quill',this.state.quill)
    this.state.quill.setContents([
    { insert: this.state.content }
  ]);





  })
  .catch( (error) => {
    console.log('error grabbing chapter data', error)
  })

}

// // printing Chapters after get request
// printChapters() {
//   const chapter = this.state.chapter;
//   if(chapter!== undefined)
//   Object.keys(chapter).map ( (key)=> {
//     this.setState({
//       content:chapter[key]['content'],
//       characterCount: chapter[key]['characters']
//     })
//   })
//   console.log('quill',this.state.quill)
//   this.state.quill.setContents([
//   { insert: this.state.content }
// ]);
// }

  render() {
    // setting this.props to book for readability
    const book = this.props;
    // console.log('quill',this.state.quill)
    // console.log('quill',quill)
    return (
      <div id="textEditor">
        {/* Chapter Title - passed down from props */}
        <h1>Chapter Editor</h1>
        {/* Printing title from props */}

        {/* Quill container */}
        <div id="editor">

        </div>

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

        {/* <button className="uk-button-danger"onClick={book.toggleTextEditor}>Close Editor</button> */}
        {/* <button onClick={book.toggleChapterView}>View All Chapter</button> */}
        <button className="uk-button-danger editorButton"onClick={book.toggleChapterView}>Close Editor</button>

        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Editor;
