// importing sass file
import './app.scss'

// importing Book.js
import Book from './components/Book';

// importing nav bar
import Navigation from './components/Navigation';

// importing landing page
import Welcome from './components/Auth/Welcome';

// importing react and component
import React, {Component} from 'react';

//importing axios
import axios from 'axios';

// importing firebase
import * as firebase from "firebase";

// importing account
import Account from './components/Auth/Account';

// creating app component
class App extends Component {
  constructor() {
    super();
    // setting initital states to false
    this.state = {
      // for dev - setting edit state to true
      // viewEditor : true,
      viewEditor: false,
      viewChapter: false,
      book: {},

      // Checking if a user is signed in
      userSignIn: false,
      // userSignIn: true,

      // user's email
      email:'',
      // user Account
      accountView: false,
      //user's unique key from firebase
      uid: '',
     //
     displayName: '',


      // for testing - disabling sign in, spoofing signed in user
      // userSignIn: true,
      // displayName: 'Dominic',
      // uid: process.env.userIdTesting



    }
    // binding methods
    this.printBooks = this.printBooks.bind(this);
    this.toggleTextEditor = this.toggleTextEditor.bind(this);
    this.toggleChapterView = this.toggleChapterView.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.createUser = this.createUser.bind(this);


  }
  componentDidMount() {
    // Initializing Firebase
    var config = {
       apiKey: process.env.apiKey,
       authDomain: process.env.authDomain,
       databaseURL: process.env.databaseURL,
       storageBucket: process.env.storageBucket,
       messagingSenderId: process.env.messagingSenderId
     };

    firebase.initializeApp(config);

    // getting books from firebase endpoint - if any
    this.getBooks();
  }

  // log Out Button - temporary, not proper way
  logOut() {
    console.log('loggin out user')
    if(this.state.userSign === false) {
        alert("you aren't signed in");
        return;

    }
    // signing out user
    this.setState({
      // setting user sign in to false
      userSignIn: false,
      // clearing user id
      uid: '',
      // emptying book object
      book: {},
      // setting state to inital values
      viewEditor: false,
      viewChapter: false,
      email:'',
      accountView: false,
      displayName: ''

    })
  }

  // user account
  toggleAccount() {
        console.log('editor has been toggled')
        // if(this.state.accountView === false) {
          // state changed to true

          // changing state to true when account view button is clicked
          this.setState({accountView:true})
          // this.setState({chapterTitle: chapterTitle})
          // viewChapter state changed to false
          // this.setState({viewChapter:false})
        // }
        // else
          // this.setState({accountView:false})
  }

  // create user - firebase
  createUser(email, password, displayName) {
    console.log('new user has been created')
    console.log('email type',typeof email)
    // console.log(email, password, displayName)
    // creating a new user - firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
    //promise object - only toggles user sign in on successful account sign up
    .then(
      (response)=>{
        console.log(response)
        console.log('success');

        // getting user details
        firebase.auth().onAuthStateChanged( (user) => {

          // invoking firebase current user
          var user = firebase.auth().currentUser;

          // adding name to user object
          user.updateProfile({
            displayName: displayName,
            photoURL: "http://placehold.it/350x150"
          }).then( () => {
            // Update successful.
            // getting user's unique key and email address
            this.setState({
              uid: user.uid,
              email: user.email,
              displayName: displayName,
            })
            // toggling sign in state
            this.toggleUserSignIn();

          }, function(error) {
            // An error happened.
            console.log('error updating profile',error)
          });

        });


      }
    )
    .catch(function(error) {
      // outputting error message using an alert.
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(error, errorCode, errorMessage)
      console.log('error creatiing user', error)
      // error message
      alert(`${error.message}  \n Error Code: ${error.code}`);

      // ...
    });



  }


  // toggle User Sign In - renders book component - null value means account created
  toggleUserSignIn(email='null', password='null') {
    console.log('from input',email, password )
    /*
    when user creates an account, can't passing in password data results in flashing error.
    When function is passed with no arguments, then user account has been created
    */
    if(email ==='null') {
        // getting user details
        firebase.auth().onAuthStateChanged( (user) => {
          console.log('user details:', user)
          console.log(`userId: ${user.uid} email:${user.email}`);

          // getting user's unique key and email address
          this.setState({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            // this.setState({userSignIn:true})
            userSignIn:true
          })
        });
                // exiting function
        return;


    }
    firebase.auth().signInWithEmailAndPassword(email, password)
    // adding promise object to sign user in on sucess
    .then( ()=> {
        console.log('user was able to log in');


        // getting user details
        firebase.auth().onAuthStateChanged( (user) => {
          console.log('user details:', user)
          console.log(`userId: ${user.uid} email:${user.email}`);

          // getting user's unique key and email address
          this.setState({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          })
          this.getBooks();
        });

        if(this.state.userSignIn === false) {
          // changing user sign in state to true
          this.setState({userSignIn:true})
        }
        else
          this.setState({userSignIn:false})
    })
    .catch(function(error) {
      console.log('error loggin in:', error)
      // error codes + message
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('invalid password or email')

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
    // Setting states of Editor, Account and Chapter view to false in order to list all of the books
    this.setState({viewEditor: false})
    this.setState({accountView:false})
    this.setState({viewChapter:false})
  }

  // function to get books from firebase
  getBooks() {
    console.log('fetching books');

    // ajax call to get books from firebase endpoint - based on signed in user's uid
    const url = `https://build-a-book.firebaseio.com/users/${this.state.uid}.json`
    console.log(url)
    axios.get(url)
      .then( (response)=> {
        console.log('response',response.data);
        // setting response containing books to book state
        this.setState({book:response.data.books})
      })
      .catch( (error) => {
        console.log('error getting books',error)
      })
  }

  // function to print out books
  printBooks() {
    /*
      printing book component, sending book data as props
    */

    return(
      <Book
        // book object from user's firebase endpoint
        book={this.state.book}
        // Passing getBooks method as prop = to update books after new book is added
        getBooks = { () => {console.log('trying to get books');this.getBooks()} }
        user = {this.state.displayName}
        // using user Id to pass to firebase endpoint
        userId = {this.state.uid}
        // editor={()=>this.toggleTextEditor()}
        viewEditor={this.state.viewEditor}
        viewChapter = {this.state.viewChapter}
        toggleChapterView = {() => this.toggleChapterView()}
        toggleTextEditor = { ()=> this.toggleTextEditor() }
      />
    )

  }

  render() {
    // rendering if account view is not true
    if(this.state.userSignIn && !this.state.accountView) {
    return (
      <div>
        {/* Navigation component - Nav Bar */}
        <header>
          <Navigation
            toggleAccount= {()=> this.toggleAccount()}
            toggleEdit={()=>{this.toggleTextEditor()}}
            viewEditor={this.state.viewEditor}
            bookView = {()=>{this.toggleBookView()}}
            logOut = {()=> this.logOut()}
          />
        </header>
        <main>
        {/* Rendering Book Component */}
        <div className="books">
          {this.printBooks()}
        </div>
      </main>
        {/* <a href="http://google.com">Test</a> */}
     </div>
    )
  }
  // Account View
  if(this.state.accountView === true) {
    return(
      <div>
        Account View
        {/* Navigation component - Nav Bar */}
        <header>
          <Navigation
            toggleAccount= {()=> this.toggleAccount()}
            toggleEdit={()=>{this.toggleTextEditor()}}
            viewEditor={this.state.viewEditor}
            bookView = {()=>{this.toggleBookView()}}
            logOut = {()=> this.logOut()}
          />
        </header>
        <main>
          <Account
            name={this.state.displayName}
          />
        </main>
     </div>


        )
  }

  // This will be statistics page
  if(this.state.statistics === true) {
    return(
      <div>
        Account View
        {/* Navigation component - Nav Bar */}
        <header>
          <Navigation
            toggleAccount= {()=> this.toggleAccount()}
            toggleEdit={()=>{this.toggleTextEditor()}}
            viewEditor={this.state.viewEditor}
            bookView = {()=>{this.toggleBookView()}}
            logOut = {()=> this.logOut()}
          />
        </header>
        <main>
          <Account
            name={this.state.displayName}
          />
        </main>
     </div>


        )
  }
  // rendering sign up page if user not signed in
  else {
    return (
      <div>
        {/* App Landing Page - when no user is signed in */}
        <Welcome
          createUser = {(email, password, displayName) => this.createUser(email, password, displayName)}
          userSignedIn = { ()=> this.toggleUserSignIn()}
          // passing function to authenticate user down as prop
          toggleUserSignIn = { (email, password)=> {this.toggleUserSignIn(email, password)}}
         />
      </div>
    )
  }
  }

}



export default App;
