// importing react and component
import React, {Component} from 'react';

// importing chapter component
import Chapter from './Chapter';
// importing resource component
import Resource from './Resource';

// creating Book component
class Book extends Component {
  constructor(props) {
    super(props);

    // setting state to allow for conditional rendering
    this.state = {
      editor: false
    }

    // binding functions
    this.printChapters = this.printChapters.bind(this);
    this.toggleTextEditor = this.toggleTextEditor.bind(this)
  }

  // prints out resources depending on num available in database
  printResources() {

  }

  // prints out chapters depending on num available in database
  printChapters() {
    return(
    Object.keys(this.props.book['chapters']).map( (key, i)=> {
      return(
    <Chapter
      key={i}
      chapters = {this.props.book['chapters'][key]['title']}
      title = {this.props.book['title']}
      view={false}

      />
    )

    })
  )
  }

  // Toggles text editor based on state
  toggleTextEditor() {
    if(this.state.editor === false)
      this.setState({editor:true})
    else
      this.setState({editor:false})

  }

  render() {
    // variable for book title.
    const book_title = this.props.book['title'];
    let editState = this.state.editor;

    // renders chapters when edit state false
    if(editState === false) {
      return (
        <div>
          {/* Toggling Text Editor */}
          <button onClick={() => this.toggleTextEditor()}>Toggle Editor</button>
          <h1>
            {/* Book Title */}
            {book_title}
          </h1>

          {/* Printing chapters */}
          {this.printChapters()}

          {/* Rendering Resource component */}
          <Resource />
          {/* Rendering chapter component */}

          <a href="http://google.com">Test</a>
       </div>
      )

    }


    // renders editor if edit state true
    if(editState === true){
      return (
        <div>Hello
          <button onClick={() => this.toggleTextEditor()}>Toggle Editor</button>
        </div>
      )




    }
  }
}



export default Book;
