// importing react and component
import React, {Component} from 'react';

// creating Editor component
class Editor extends Component {
  constructor() {
    super();
  }

  render() {
    // setting this.props to book for readability
    const book = this.props;
    return (
      <div>
        {/* Chapter Title - passed down from props */}
        <h1>{book.chapterTitle}</h1>
        {/* Printing title from props */}
        Editor
        <button onClick={book.toggleTextEditor}>Toggle Editor</button>
        <button onClick={book.toggleChapterView}>Toggle Chapter</button>
        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Editor;
