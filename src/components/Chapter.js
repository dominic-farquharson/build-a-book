// importing react and component
import React, {Component} from 'react';

// creating Chapter component
class Chapter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/* Printing title from props */}
        <p>{this.props.chapters}</p>
        <button onClick = {this.props.toggleTextEditor}>View</button>
        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Chapter;
