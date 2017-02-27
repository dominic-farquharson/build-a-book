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


import BookItem from './BookItem';



// importing axios
import axios from 'axios';

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
      editBook: false
    }
  }

  componentDidMount() {
    // this.props.getBooks();
  }

  // prints out resources depending on num available in database
  printResources() {

  }

  // toggles Add Chapter component
  toggleAddChapter() {
    console.log('toggling add Chapter')


    // sets state of addChapter to false if true
    if(this.state.addChapter) {
      this.setState({addChapter: false});
      // axios call to update books after posting
      // console.log('get books',this.props)
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
    console.log('setting chapter title')
    // setting state
    this.setState({chapterTitle: title})
  }

  // prints out chapters depending on num available in database
  printChapters() {
    // user's id
    const uid = this.props.userId;
    console.log(this.props.books)
    // books[book]['title']



    /* Using title from state to render chapters of a specific book */
    let book = this.props.book[this.state.title]['chapters'];
    console.log('book',book)

    /*
    if chapters is undefined - there are no chapters, renders add a chapter
    Also rendered if user toggles state of addChapter and sets it to true

    */
    if(book === undefined  || this.state.addChapter===true) {

        return (
          <div>
            <h1>Add A Chapter</h1>
            {/* Rendering Add Chapter component */}
            <AddChapter
               // user's key
               userId = {uid}
               // toggles Add Chapter component
               toggleAddChapter = {()=> this.toggleAddChapter()}
               // getting book's unique key to post chapters to it
               bookKey = {this.state.title}
              />
          </div>
        )
      }


      else {
    return(
      // grabbing keys from object
      Object.keys(book).map( (key, i)=> {

        // printing add chapter form - if no chapters present or if user toggles it
        // if(this.props.book[key]['title']['chapters'] === undefined && i==0) {
        //   return (
        //     <div key={i}>
        //       <AddChapter
        //         // user's key
        //         userId = {uid}
        //         // getting book's unique key to post chapters to it
        //         bookKey = {key}
        //        />
        //     </div>
        //   )
        // }

        // rendering Chapter component when chapters object isn't null
          return (
            <Chapter
              userId = {uid}
              key = {i}
              // axios call to refresh books after it's updated
              // getBooks = {()=> this.props.getBoooks()}
              getBooks = {()=> this.props.getBooks()}

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
         preventing title from being printed mutliple times
         Only printed when key = 0
        */
        // if(i === 0) {
      //   else {
      //   return (
      //     <Chapter
      //       key = {i}
      //       title = {this.state.title}
      //       chapter = {book[key]['title']}
      //       toggleTextEditor = {()=>{this.setChapterTitle(key); this.props.toggleTextEditor()}}
      //
      //     />
      //   )
      // }

    //   /*
    //   - printing chapters without title property
    //   - passing chapter data, and toggleEditor function down
    //     as props.
    //   - toggleEditor will update state to render chapter view
    //
    //   */


  /*
   setting current book title to state
   Will reference this when printing book

  */
  setBookTitle(title) {
    console.log('the title is', title)
    // setting  book title to state
    this.setState({title: title})
  }

  // Deleting a book function
  deleteBook(bookKey) {
    console.log('deleting book', bookKey)
    // user id
    const uid= this.props.userId;

    // Book endpoint - based on key of user and key of book
    const url = `https://build-a-book.firebaseio.com/users/${uid}/books/${bookKey}.json`;
    console.log('will be deleting',url)
    axios.delete(url)
    // promise to update state of books after book has been deleted
    .then(
      (response)=>{
        alert('Book has been deleted');
        // refreshing books object after book has been delted
        this.props.getBooks();
        // prining out books based on refreshed book object
        this.printBookTitles();
    })
    .catch(
      (error)=> {
        alert('error deleting book')
    })

  }
  // editing a book
  editBook(bookKey, title) {
    console.log('editing', bookKey, 'title', title)
    // url for chapter endpoint - based on user's id, the book key, and the chapter's key
    const url = `https://build-a-book.firebaseio.com/users/${this.props.userId}/books/${bookKey}.json`;

    // Patch request to update book endpoint with new book title and image
    axios.patch(url, {
      title:title,
    })
    .then( (response) => {
      alert(`updated title`);
      this.toggleChapterEdit();
    })
    .catch( (error) => {
      console.log('error updating title and image')
      this.toggleChapterEdit();
    })
  }

  // toggles state of book edit
  toggleEditBook() {
    console.log('toggling edit book')
    // sets state of addChapter to false if true
    if(this.state.editBook) {
      this.setState({editBook: false});
      // axios call to update books after posting
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
        console.log('book item', book)
        return (
          // printing key from object, represents book titlee
          <li key={i}>
            <BookItem
              key={book}
              // unique key for each book
              bookKey={book}
              // book title
              title={books[book]['title']}
              // function to update objects
              getBooks = {()=> this.props.getBooks()}
              // setting title of book to state
              setBookTitle = {()=>this.setBookTitle(book) }
              // printing all bookd
              printBookTitles = {()=> this.printBookTitles()}
              deleteBook = {()=>this.deleteBook(book)}
              editBook = {(bookKey, title)=>this.editBook(bookKey, title)}
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

      // return(
      //   <div>
      //     <h3>Edit {this.state.title}</h3>
      //     <div>
      //       {/* Chapter title Input Box filled w/ value of title */}
      //       <label htmlFor="chapterTitle">Title: </label>
      //       {/* <input id="chapterTitle" name="chapterTitle" type="text" ref={(chapterTitleInput) => {this.chapterTitleInput=chapterTitleInput}} defaultValue={chapter.chapterTitle} required /> */}
      //     </div>
      //     <div>
      //       {/* Chapter Image input box filled w/ value of title */}
      //       <label htmlFor="chapterImage">Image:</label>
      //       {/* <input id="chapterImage" name="chapterImage" type="text" ref={(chapterImage) => {this.chapterImageInput=chapterImage}} defaultValue={chapter.chapterImage} required /> */}
      //     </div>
      //     {/* Grabbing updated title and image */}
      //     {/* <button onClick={ ()=> this.updateChapterInfo(this.chapterTitleInput.value, this.chapterImageInput.value)}>Save</button> */}
      //     {/* Toggling Edit state - closing chapter Info editor  */}
      //     <button onClick = {()=> this.editBook(key)}>Close</button>
      //     <hr />
      //   </div>
      // );

  //   else {
  //
  //   return(
  //   Object.keys(books).map( (book, i) => {
  //     console.log('book item', book)
  //     return (
  //       // printing key from object, represents book titlee
  //       <li key={i}>
  //         {/* Printing book title */}
  //         {books[book]['title']}
  //         <br />
  //         {/* Viewing chapters based on book's key */}
  //         {/* <button onClick={()=>{this.printChapters(book); }}>View Chapter</button> */}
  //         <button onClick={ ()=>{this.setBookTitle(book); this.props.toggleChapterView() } }>View Chapters</button>
  //         {/* Runs function to delete a book */}
  //         <button onClick={()=>this.deleteBook(book)}>Delete Book</button>
  //         {/* Add Edit Button */}
  //         <button onClick={()=>this.toggleEditBook(book)}>Edit Book</button>
  //
  //
  //       </li>
  //     )
  //   })
  // )
  // }
}


  /* Adding a Book. Posting to Firebase */
  addBook(uid, bookTitle) {
    /*
     will need function to update state of books in app.js after new book added
     or rerun fetch books request
     */
    const url = `https://build-a-book.firebaseio.com/users/${uid}/books.json`;
    axios.post(url, {
      title:bookTitle
    })
    .then( (response) => {
      console.log('post request succesful', response);
      // updating state of books after new book is added
      this.props.getBooks();
      // setting add book form's state to false - rendering all books view
      this.toggleAddBook();

    })
    .catch( (error) => {
      console.log('error posting new book', error)
    })

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
    // const book_title = this.props.book['title'];
    let viewChapter = this.props.viewChapter;
    let viewEditor = this.props.viewEditor;
    let addBook = this.state.addBook;


    // renders books when edit state and view chapter state is false
    if(viewChapter === false && viewEditor=== false) {
      // reners AddBook form when addBook state is true
      if(addBook) {
        return (
          <form action="#" method="POST">
            {/* Storing value of Input field */}
            <input tyep="text" name="bookTitle" ref={ (bookTitle)=>{this.bookTitle = bookTitle}} placeholder="Book Title" required />

            {/* Grabs value of input field, along with user id to send post request to firebase endpoint */}
            <input type="button" onClick={ ()=> this.addBook(this.props.userId, this.bookTitle.value) } value="Add Book" />

            {/* Toggling add Book state - renders all books */}
            <input type="button" onClick={ ()=> this.toggleAddBook() } value="Cancel" />

          </form>
        )
      }
      // prints all books when add Book state is false
      else {
      // Viewing all books
      return (
        <div>
          <p>Books List</p>
          <h1>{this.props.user}</h1>

          {/* Toggles Add A book - Renders form by setting addbook state to true */}
          <button onClick={()=>this.toggleAddBook()}>Add a Book</button>


          {/* View Text Editor - Button Toggle */}
          {/* <button onClick={this.props.toggleTextEditor}>Open Editor</button> */}
          {/* View All Chapters Button Toggle  */}
          {/* <button onClick={this.props.toggleChapterView}>View All Chapter</button> */}
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
    }

    // renders chapter if edit state false and viewChapter is true
    if(viewChapter === true && viewEditor ===false){
      return (
        <div>
          <h1>Chapters view</h1>
          {/* Printing chapters */}
          {this.printChapters()}

          {/* <button onClick={this.props.toggleTextEditor}>Toggle Editor</button>
          <button onClick={this.props.toggleChapterView}>Toggle Chapter</button> */}

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
