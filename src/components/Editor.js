// importing react and component
import React, {Component} from 'react';

// importing quill editor
import Quill from 'quill';
// let Quill = require('quill')
// console.log(quill)



// creating Editor component
class Editor extends Component {
  constructor() {
    super();
  }



  // initializing quill when component mounts
  componentDidMount() {
    // rendering editor
    var quill = new Quill('#editor', {
    // theme - includes toolbar
    theme: 'snow',
    placeholder: 'Enter some text'
  });
  this.setState({quill:quill})
  console.log('get length', quill.getLength())

}

  render() {
    // setting this.props to book for readability
    const book = this.props;
    // console.log('quill',this.state.quill)

    return (
      <div id="textEditor">
        {/* Chapter Title - passed down from props */}
        <h1>Editor <br />{book.chapterTitle}</h1>
        {/* Printing title from props */}

        {/* Quill container */}
        <div id="editor">

        </div>

        <button className="uk-button-success" onClick={
          ()=> {
            var length = this.state.quill.getLength();
            console.log('length', length)
            console.log('saving')}
          }>
          Save
        </button>

        <button className="uk-button-danger"onClick={book.toggleTextEditor}>Close Editor</button>
        <button onClick={book.toggleChapterView}>View All Chapter</button>
        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Editor;
