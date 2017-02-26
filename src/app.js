// importing sass file
import './app.scss'

// importing Book.js
import Book from './components/Book';

// importing nav bar
import Navigation from './components/Navigation';

// importing react and component
import React, {Component} from 'react';

//importing axios
import axios from 'axios';

// importing firebase
import * as firebase from "firebase";

// creating app component
class App extends Component {
  constructor() {
    super();
    // setting initital states to false
    this.state = {
      viewEditor: false,
      viewChapter: false,
      book: {}
    }
    // binding methods
    this.printBooks = this.printBooks.bind(this);
    this.toggleTextEditor = this.toggleTextEditor.bind(this);
    this.toggleChapterView = this.toggleChapterView.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.createUser = this.createUser.bind(this);


  }

  componentDidMount() {
    // getting books from firebase endpoint - if any
    this.getBooks();
  }

  // create user - firebase
  createUser(email, password) {

    // Initialize Firebase
    var config = {
       apiKey: process.env.apiKey,
       authDomain: process.env.authDomain,
       databaseURL: process.env.databaseURL,
       storageBucket: process.env.storageBucket,
       messagingSenderId: process.env.messagingSenderId
     };

    firebase.initializeApp(config);


    console.log('new user has been created')
    console.log(email, password)
    // creating a new user - firebase
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // outputting error message using an alert.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(`${error.message}  \n Error Code: ${error.code}`);

      // ...
    });
  }

  // Toggles text editor based on state
  toggleTextEditor(chapterTitle) {
    console.log('editor has been toggled')
    if(this.state.viewEditor === false) {
      // state changed to true
      this.setState({viewEditor:true})
      this.setState({chapterTitle: chapterTitle})
      // viewChapter state changed to false
      this.setState({viewChapter:false})
    }
    else
      this.setState({viewEditor:false})

  }

  // Toggles Chapter View
  toggleChapterView() {
    console.log('chapter has been toggled')
    if(this.state.viewChapter=== false) {
      this.setState({viewChapter:true})
      this.setState({viewEditor: false})
    }
    else
      this.setState({viewChapter:false})

  }

  // Home page - lists all books. Displayed when editor and chapter's state are false
  toggleBookView() {
    console.log('Book view is toggled')
    this.setState({viewEditor: false})
    this.setState({viewChapter:false})
  }

  // function to get books from firebase
  getBooks() {
    console.log('get books has mounted');

    // ajax call to get books from firebase endpoint
    const url = 'https://build-a-book.firebaseio.com/user1.json'
    axios.get(url)
      .then( (response)=> {
        console.log(response.data);
        this.setState({book:response.data.books})
      })
      .catch( (error) => {
        console.log('error getting books',error);
      })
  }

  // function to print out books
  printBooks() {
    /*
      printing book component, sending book data as props
    */

    return(
      <Book book={this.state.book}
        // editor={()=>this.toggleTextEditor()}
        viewEditor={this.state.viewEditor}
        viewChapter = {this.state.viewChapter}
        toggleChapterView = {() => this.toggleChapterView()}
        toggleTextEditor = { ()=> this.toggleTextEditor() }
      />
    )

  }

  render() {
    return (
      <div>
        {/* Navigation component - Nav Bar */}
        <header>
          <Navigation
            toggleEdit={()=>{this.toggleTextEditor()}}
            viewEditor={this.state.viewEditor}
            bookView = {()=>{this.toggleBookView()}}
          />
        </header>
        <main>
        {/* Rendering Book Component */}
        <div className="books">
          {this.printBooks()}
        </div>
        <div>
          <form action="#" method="POST">
            {/* Using refs to grab input values to pass to create user function */}
            <input name="username" ref={(email) => {this.emailInput=email}} type="text" placeholder="email" required />
            <input name="password" ref={(password) => {this.passwordInput=password}} type="text" placeholder="password" required />
            {/*
              Posting user info to firebase
              Passing password, email to createuser function
            */}
            <input type="button" value="Create Account" onClick={()=>this.createUser(this.emailInput.value, this.passwordInput.value)} />
          </form>
        </div>

      </main>
        <a href="http://google.com">Test</a>
     </div>
    )
  }
}



export default App;
