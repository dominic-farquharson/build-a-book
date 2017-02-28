// importing react and component
import React, {Component} from 'react';

// importing quill editor
import quill from 'quill';

console.log(quill);

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
        <h1>Editor <br />{book.chapterTitle}</h1>
        {/* Printing title from props */}

        <button onClick={book.toggleTextEditor}>Close Editor</button>
        <button onClick={book.toggleChapterView}>View All Chapter</button>
        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Editor;
