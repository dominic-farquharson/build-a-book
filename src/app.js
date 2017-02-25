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
      'chapter1':{
        'title':'title 1',
        'images':['im1', 'im2']
      },
      'chapter2': {
        'title':'title 2',
        'images':['im1', 'im2']
      },
      'chapter3':{
        'title':'title 3',
        'images':['im1', 'im2']
      },
      'chapter4': {
        'title':'title 4',
        'images':['im1', 'im2']
      }


    }
    //will have an  ajax call, prints books depending on database
    /*
      printing book component, sending book data as props
    */

    return(
      Object.keys(book).map( (key, i)=> {
        return(
          <Book
            title={book[key]['title']} />
      )
      })

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
