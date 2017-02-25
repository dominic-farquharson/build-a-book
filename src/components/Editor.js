// importing react and component
import React, {Component} from 'react';

// creating Editor component
class Editor extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/* Printing title from props */}
        Editor
        <button onClick={this.props.toggleTextEditor}>Toggle Editor</button>
        <button onClick={this.props.toggleChapterView}>Toggle Chapter</button>
        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Editor;
