// importing sass file
import './app.scss'

// importing Book.js
import Book from './components/Book';

// importing nav bar
import Navigation from './components/Navigation';

// importing react and component
import React, {Component} from 'react';

// creating app component
class App extends Component {
  constructor() {
    super();
    // setting initital states to false
    this.state = {
      viewEditor: false,
      viewChapter: false
    }
    // binding methods
    this.printBooks = this.printBooks.bind(this);
    this.toggleTextEditor = this.toggleTextEditor.bind(this);
    this.toggleChapterView = this.toggleChapterView.bind(this);


  }

  // Toggles text editor based on state
  toggleTextEditor() {
    console.log('editor has been toggled')
    if(this.state.viewEditor === false) {
      this.setState({viewEditor:true})
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
        editor={()=>this.toggleTextEditor()}
        viewEditor={this.state.viewEditor}
        viewChapter = {this.state.viewChapter}
        toggleChapterView = {() => this.toggleChapterView()}
        toggleTextEditor = { ()=> this.toggleTextEditor() }
      />
      // iterating through chapters object - to get book chapters
      // Object.keys(book['chapters']).map( (key, i)=> {

          // <Book
          //   key={i}
          //   chapters = {book['chapters'][key]['title']}
          //   title = {book['title']}
          //
          //   />

      )



  }

  render() {
    return (
      <div>
        <Navigation toggleEdit={()=>{this.toggleTextEditor()}} />
        {/* Rendering Book Component */}
        {this.printBooks()}
        <a href="http://google.com">Test</a>
     </div>
    )
  }
}



export default App;
