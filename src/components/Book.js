// importing react and component
import React, {Component} from 'react';

// importing chapter component
import Chapter from './Chapter';
// importing resource component
import Resource from './Resource';

// importing Editor component
import Editor from './Editor';

// creating Book component
class Book extends Component {
  constructor(props) {
    super(props);

    // setting state to allow for conditional rendering
    // edit condition, originally false

    // this.state = {
    //   editor: this.props.view
    // }

    // binding functions
    this.printChapters = this.printChapters.bind(this);
    // function to set state for chapter Title to pass down to editor as prop
    this.setChapterTitle = this.setChapterTitle.bind(this);
    // this.toggleTextEditor = this.toggleTextEditor.bind(this)

    // setting initial title state to untitled
    this.state = {
      chapterTitle:'untitled',
      title:''
    }
  }

  // prints out resources depending on num available in database
  printResources() {

  }

  // sets chapter title to be sent down to editor as prop
  setChapterTitle(title) {
    // setting state
    this.setState({chapterTitle: title})
  }

  // prints out chapters depending on num available in database
  printChapters() {
    /* Using title from state to render chapters of a specific book */
    let book = this.props.book[this.state.title];

    return(
      // grabbing keys from object
      Object.keys(book).map( (key, i)=> {
        console.log(book['chapters'])
        // let newObject = this.props.book[key]['chapters'];
        // console.log(this.props.book[key]['chapters']);
        // console.log('newObject', newObject)
        return (
          // <div key={i}>{book['chapters']}</div>
          <Chapter
            title = {this.state.title}

          />
        )
        // return (
        //   // using book's key to render it's chapters
        //   Object.keys(newObject).map( (chapter, i) => {
        //   console.log(chapter, i)
        //     return (
        //     // rendering book chapters
        //     <div chapter={i}>{chapter}</div>
        //     )
        //   })
        // )
      })
    )


  }

  /*
   setting current book title to state
   Will reference this when printing book

  */
  setBookTitle(title) {
    console.log('the title is', title)
    // setting  book title to state
    this.setState({title: title})
  }

  printBookTitles() {
    // setting books object to a variable
    const books = this.props.book;
    return(
    Object.keys(books).map( (book, i) => {
      return (
        // printing key from object, represents book titlee
        <li key={i}>
          {book}
          <br />
          {/* Viewing chapters based on book's key */}
          {/* <button onClick={()=>{this.printChapters(book); }}>View Chapter</button> */}
          <button onClick={ ()=>{this.setBookTitle(book); this.props.toggleChapterView() } }>View Chapter</button>

        </li>
      )
    })
  )
  }

  render() {
    // variable for book title.
    // const book_title = this.props.book['title'];
    let viewChapter = this.props.viewChapter;
    let viewEditor = this.props.viewEditor;

    // renders books when edit state and view chapter state is false
    if(viewChapter === false && viewEditor=== false) {
      // Viewing all books
      return (
        <div>
          {/* Add a Chapter */}
          <button>Add a chapters</button>
          {/* View Text Editor - Button Toggle */}
          <button onClick={this.props.toggleTextEditor}>Open Editor</button>
          {/* View All Chapters Button Toggle  */}
          <button onClick={this.props.toggleChapterView}>View All Chapter</button>
            {/* Printing book titles from firebase endpoint */}
          <ul>
            {this.printBookTitles()}
          </ul>

          {/* Rendering Resource component */}
          <Resource />
          {/* Rendering chapter component */}

          <a href="http://google.com">Test</a>
       </div>
      )

    }


    // renders chapter if edit state false and viewChapter is true
    if(viewChapter === true && viewEditor ===false){
      return (
        <div>
          <h1>Chapters view</h1>
          {/* Printing chapters */}
          {this.printChapters()}
          <button onClick={this.props.toggleTextEditor}>Toggle Editor</button>
          <button onClick={this.props.toggleChapterView}>Toggle Chapter</button>

        </div>
      )
    }
      // Rendering editor when view editor is true, but viewChapter state is false
      if(viewEditor === true && viewChapter !== true) {
        return (
          <div>
            {/* Passing toggle Editor and Toggle Chapter down as props */}
            <Editor
              // currentChapter = {this.state.chapterTitle}
              viewEditor={this.props.viewEditor}
              viewChapter = {this.props.viewChapter}
              toggleChapterView = {this.props.toggleChapterView}
              toggleTextEditor = {this.props.toggleTextEditor}
              chapterTitle = {this.state.chapterTitle}
             />
          </div>
        )
      }


    }
  }




export default Book;
