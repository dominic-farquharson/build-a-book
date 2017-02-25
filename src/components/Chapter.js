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
     </div>
    )
  }
}



export default Chapter;
