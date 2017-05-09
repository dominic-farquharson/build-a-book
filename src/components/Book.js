// importing react and component
import React, {Component} from 'react';

// importing chapter component
import Chapter from './Chapter';

// importing resource component
import Resource from './Resource';

// importing Editor component
import Editor from './Editor';

// Adding Chapter
import AddChapter from './AddChapter';

// importing book item
import BookItem from './BookItem';

// importing Firebase
import * as firebase from "firebase";

// creating Book component
class Book extends Component {
  constructor(props) {
    super(props);

    // binding functions
    this.printChapters = this.printChapters.bind(this);
    // function to set state for chapter Title to pass down to editor as prop
    this.setChapterTitle = this.setChapterTitle.bind(this);
    // this.toggleTextEditor = this.toggleTextEditor.bind(this)

    // setting initial title state to untitled
    this.state = {
      chapterTitle:'untitled',
      title:'',
      // add Book input field state initially false
      addBook: false,
      // Renders Add Chapter component when true
      addChapter: false,
      editBook: false,

    }
  }

  // prints out resources depending on num available in database
  printResources() {

  }

  // toggles Add Chapter component
  toggleAddChapter() {
    console.log('toggling add chapter')
    // sets state of addChapter to false if true
    if(this.state.addChapter) {
      this.setState({addChapter: false});
      //  updating books after posting
      this.props.getBooks();
      // rendering Add Chapter Component
      this.printChapters();
    }
    // sets state of addchapter to true if false
    else {
      this.setState({addChapter: true});

    }
  }

  // sets chapter title to be sent down to editor as prop
  setChapterTitle(title) {
    // setting state
    this.setState({chapterTitle: title})
  }

  // prints out chapters depending on num available in database
  printChapters() {
    // user's id
    const uid = this.props.userId;
   
    /* Using title from state to render chapters of a specific book */
    let book = this.props.book[this.state.title]['chapters'];
  
    /*
    if chapters is undefined - there are no chapters, renders add a chapter
    Also rendered if user toggles state of addChapter and sets it to true

    */

    if(book === undefined  || this.state.addChapter===true) {
      // making sure that addChapter is true when book is undefined
     
        return (
          <div>
            {/* Rendering Add Chapter component */}
            <AddChapter
               // user's key
               userId = {uid}
               // toggles Add Chapter component
               toggleAddChapter = {()=> this.toggleAddChapter()}
               // getting book's unique key to post chapters to it
               bookKey = {this.state.title}
               // passing down book - to determine if it is undefined
               book= {book}
               // state of add chapter 
               addChapter = {this.state.addChapter}
              />
          </div>
        )
      }

      else {
        return(
          // grabbing keys from object
          Object.keys(book).map( (key, i)=> {
            // rendering Chapter component when chapters object isn't null
              return (
                <Chapter
                  userId = {uid}
                  key = {i}
                  // ajax call to refresh books after it's updated
                  getBooks = {()=> this.props.getBooks()}
                  // description of chapter - based on key
                  description={book[key]['description']}
                  // printing book's chapters
                  printChapters = {()=>this.printChapters()}
                  // passing chapter's unique key to allow for updating it
                  chapterKey={key}
                  // toggles Add Chapter component
                  toggleAddChapter = {()=> this.toggleAddChapter()}
                  // chapter = {book[key]}
                  chapterTitle = {book[key]['title']}
                  chapterImage = {book[key]['image']}
                  bookKey = {this.state.title}
                  // Sets chapter title and toggles chapter editor
                  toggleTextEditor = {()=>{this.setChapterTitle(key); this.props.toggleTextEditor()}}
                />
              )
        })
      )
    }
  }

  /*
   setting current book title to state
   Will reference this when printing book

  */
  setBookTitle(title) {
    // console.log('the title is', title)
    // setting  book title to state
    this.setState({title: title})
  } 
 
  // Deleting a book function
  deleteBook(bookKey) {
    console.log('deleting book', bookKey)
    // user id
    const uid= this.props.userId;
    /*
     prompt user if they want to delete a book - using Electron's dialog box, accessing it via remote to use it in the renderer process
     Function returns the index of the button clicked
    */
    let userInput = deletePrompt(
      'Delete Book',
       "Are you sure you want to delete this book?", 
       "Note: The book and all of its chapters will be deleted. This process can NOT be reversed"
    );

    // 0 is index of yes button
    if(userInput===0) {
      console.log('user selected yes')
      // Deleting book based on Book's key
      let book = firebase.database().ref(`/users/${uid}/books/${bookKey}`).remove();
      // notifying user
      alert('The book has been deleted.')
    }
    return;
    
  }
  // editing a book's title
  editBook(bookKey, title, cover) {
    // object containing new title
    let book = {title, cover}
    // User Id
    const uid = this.props.userId;
    // endpoint of book to be edited
    let endpoint = `/users/${uid}/books/${bookKey}/`;
    // Updating book
    let updatedBook = firebase.database().ref(endpoint).update(book)
      // promise 
      .then( ()=> {
        // notifying user
        alert('Book has been successfully edited.')
      })
  }

  // toggles state of book edit
  toggleEditBook() {
    console.log('toggling edit book')
    // sets state of addChapter to false if true
    if(this.state.editBook) {
      this.setState({editBook: false});
      // ajax call to update books after posting
      this.props.getBooks();
      // rendering Add Chapter Component
      this.printBookTitles();
    }
    // sets state of addchapter to true if false
    else {
      this.setState({editBook: true});

    }
  }

  // printing book titles from books object
  printBookTitles() {
    // setting books object to a variable
    const books = this.props.book;
    console.log('books',this.props);
    if(books === undefined) {
      return (
        <div>Welcome</div>
      )
    }
    // renders when edit book is true
    if(!this.state.editBook){
      return(
      Object.keys(books).map( (book, i) => {
        // console.log('book item', book)
        return (
          // printing key from object, represents book titlee
          <li className="bookItem" key={i}>
            <BookItem
              key={book}
              // unique key for each book
              bookKey={book}
              // book title
              title={books[book]['title']}
              // book url
              bookCover={books[book]['cover']}
              // function to update objects
              getBooks = {()=> this.props.getBooks()}
              // setting title of book to state
              setBookTitle = {()=>this.setBookTitle(book) }
              // printing all bookd
              printBookTitles = {()=> this.printBookTitles()}
              deleteBook = {()=>this.deleteBook(book)}
              // editing book
              editBook = {(bookKey, title, cover)=>this.editBook(bookKey, title, cover)}
              toggleChapterView = { ()=> this.props.toggleChapterView()}
            />

          </li>
        )
      })
    )
  }
    else {
      return (
        <div>Welcome</div>
      )
    }
}


  /* Adding a Book. Posting to Firebase */
  addBook(uid, bookTitle, bookCover) {
    // Preventing null value for form data
    if(!bookTitle) {
      return alert('Please enter a book title');
    }

    if(!bookCover) {
      bookCover = 'http://placehold.it/300x300';
    }

    // creating variable containing new Book Information - book title, cover and date it was added    
    let newBook = {
      title: bookTitle,
      dateAdded: 'Date Added',
      cover: bookCover
    }
    console.log('book blob', newBook)
    // // getting new book key
    let newBookKey = firebase.database().ref(`/users/${uid}/books/`).push().key;
    
    // book data to be posted, initially an empty object
    let book = {};
    // pushing new Book into book object
    book[`users/${uid}/books/${newBookKey}`] = newBook;
    // writing new book to endpoint
    firebase.database().ref().update(book)
    // adding promise, to update state of boks after new book is added
    .then( ()=> {
      console.log('new book successfully added');
      // updating state of books after new book is added
      this.props.getBooks();
      // setting add book form's state to false - rendering all books view
      this.toggleAddBook();
    })
    
    return;
  }

  // Function to toggle Add Book state - renders add book form when true
  toggleAddBook() {
    // stopping form from rendering
    if(this.state.addBook) {
      this.setState({addBook: false})
    }
    // rendering add book form
    else {
      this.setState({addBook: true})
    }
  }

  render() {
    // variable for book title.
    let viewChapter = this.props.viewChapter;
    let viewEditor = this.props.viewEditor;
    let addBook = this.state.addBook;



    // renders books when edit state and view chapter state is false
    if(viewChapter === false && viewEditor=== false) {
      // reners AddBook form when addBook state is true
      if(addBook) {
        return (
          <div id="addBookForm">
            <form  className="uk-position-center" action="#" method="POST">
              <h1>Add A Book</h1>
              {/* Storing value of Input field */}
              <input 
                className="uk-input addBookInput" 
                type="text" 
                name="bookTitle" 
                ref={ (bookTitle)=>{this.bookTitle = bookTitle}} 
                placeholder="Book Title" required 
              />
              {/* Book cover */}
              <input 
                className="uk-input addBookInput"
                name="bookCover"
                type="text" 
                placeholder="Book cover url"
                ref={ (bookCover) => {this.bookCover = bookCover}}
                required 
              />

              {/* Grabs value of input field, along with user id to send post request to firebase endpoint */}
              <input className="uk-button-default bookItemButton addBookButton" type="button" onClick={ ()=> this.addBook(this.props.userId, this.bookTitle.value, this.bookCover.value) } value="Add Book" />

              {/* Toggling add Book state - renders all books */}
              <input className="uk-button-danger bookItemButton addBookButton" type="button" onClick={ ()=> this.toggleAddBook() } value="Cancel" />

            </form>
          </div>
        )
      }
      // prints all books when add Book state is false
      else {
      // Viewing all books
      return (
        <div>
          <section className="booksHeading">
            {/* Title For View Books  */}
            <h1 className="title">{this.props.user}'s Books List</h1>
            {/* Toggles Add A book - Renders form by setting addbook state to true */}
            <button className="uk-button uk-button-primary" onClick={()=>this.toggleAddBook()}>Add a Book</button>
          </section>  
          <hr />
          {/* Printing book titles from firebase endpoint */}
          <ul className="booksView">
            {this.printBookTitles()}
          </ul>
          {/* Rendering Resource component */}
          {/* <Resource /> */}

       </div>
      )
    }
    }

    // renders chapter if edit state false and viewChapter is true
    if(viewChapter === true && viewEditor ===false){
      return (
        <div>
          <h1>Chapters view</h1>
          {/* Adding A New Chapter */}
          <button className="uk-button uk-button-primary" onClick={()=>this.toggleAddChapter()}>Add A Chapter</button>
          <hr />
          {/* Printing chapters */}
          {this.printChapters()}
        </div>
      )
    }
      // Rendering editor when view editor is true, but viewChapter state is false
      if(viewEditor === true && viewChapter !== true) {
        return (
          <div>
            {/* Passing toggle Editor and Toggle Chapter down as props */}
            <Editor
              userId={this.props.userId}
              books = {this.props.book}
              getBooks = {this.props.getBooks}
              // currentChapter = {this.state.chapterTitle}
              viewEditor={this.props.viewEditor}
              viewChapter = {this.props.viewChapter}
              toggleChapterView = {this.props.toggleChapterView}
              toggleTextEditor = {this.props.toggleTextEditor}
              chapterTitle = {this.state.chapterTitle}
              bookKey={this.state.title}
              profilePic={this.props.profilePic}
             />
          </div>
        )
      }


    }
  }




export default Book;
