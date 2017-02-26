// importing react and component
import React, {Component} from 'react';

// creating Chapter component
class Chapter extends Component {
  constructor() {
    super();
  }
  // Toggling view when component mounts
  componentDidMount() {
    // this.props.toggleChapterView();
  }

  render() {
    return (
      <div>
        <h3>Book: {this.props.title}</h3>
        Chapters
        {/* Printing title from props */}
        {/* {console.log('testing',Object.keys(this.props.chapters).map( (key, i)=> {
          console.log(this.props.chapaters[key])
        })  )} */}
        {/* <p>{this.props.chapters['chapter1']['title']}}</p> */}
        <button onClick = {this.props.toggleTextEditor}>View</button>
        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Chapter;
