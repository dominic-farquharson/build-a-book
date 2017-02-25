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

// creating app component
class App extends Component {
  constructor() {
    super();
    // setting initital states to false
    this.state = {
      viewEditor: false,
      viewChapter: false,
    }
    // binding methods
    this.printBooks = this.printBooks.bind(this);
    this.toggleTextEditor = this.toggleTextEditor.bind(this);
    this.toggleChapterView = this.toggleChapterView.bind(this);
    this.getBooks = this.getBooks.bind(this);


  }

  componentDidMount() {
    // getting books from firebase endpoint - if any
    this.getBooks();
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
    axios.get('/')
      .then( (response)=> {
        console.log(response.data);
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  // function to print out books
  printBooks() {
    // sample object to have dummy data
    let book = {
      'title': 'book_title',
      'chapters' :{
        'chapter1':{
          'title':'chapter 1',
          'images':['im1', 'im2']
        },
        'chapter2': {
          'title':'chapter 2',
          'images':['im1', 'im2']
        },
        'chapter3':{
          'title':'chapter 3',
          'images':['im1', 'im2']
        },
        'chapter4': {
          'title':'chapter 4',
          'images':['im1', 'im2']
        }


      }
    }
    //will have an  ajax call, prints books depending on database
    /*
      printing book component, sending book data as props
    */

    // change view to viewEditor for clarity

    return(
      <Book book={book}
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
      </main>
        <a href="http://google.com">Test</a>
     </div>
    )
  }
}



export default App;
