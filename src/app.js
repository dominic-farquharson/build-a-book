// importing sass file
import './app.scss'

// importing Book.js
import Book from './components/Book';

// importing react and component
import React, {Component} from 'react';

// creating app component
class App extends Component {
  constructor() {
    super();
    // binding methods
    this.printBooks = this.printBooks.bind(this);
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

    return(
      <Book book={book} />
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
      <div>App.js
        {/* Rendering Book Component */}
        {this.printBooks()}
        <a href="http://google.com">Test</a>
     </div>
    )
  }
}



export default App;
