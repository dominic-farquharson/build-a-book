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
  }

  // prints out resources depending on num available in database
  printResources() {

  }

  // prints out chapters depending on num available in database
  printChapters() {

  }

  render() {
    return (
      <div>
        <h1>
          {this.props.title}
          <br />
          {this.props.author}
        </h1>


        {/* Rendering Resource component */}
        <Resource />
        {/* Rendering chapter component */}
        <Chapter />
        <a href="http://google.com">Test</a>
     </div>
    )
  }
}



export default Book;
