// importing react and component
import React, {Component} from 'react';

// importing add chapter component
import AddChapter from './AddChapter';

// creating Chapter component
class Chapter extends Component {
  constructor(props) {
    super(props);
    // inital state
    this.state = {
      title: 'Untitled'
    }
  }
  // Toggling view when component mounts
  componentDidMount() {
    // setting title of Chapter
    this.setState({title: this.props.title})
  }

  render() {
    console.log('chapter key', this.props.key)

    // setting chapter to this.props
    const chapter = this.props;
    console.log(chapter)
    return (
      <div>

        {/* Printing Book Title */}
        <h3>{this.state.title}</h3>
        {/* printing chapters */}
        {/* <div>Chapter{this.props.chapter}</div> */}
        {/* <div>chapter{this.props.chapter}</div> */}
        <div>
          <p>{chapter.chapterTitle}</p>
          <p>{chapter['image']}</p>


        </div>
        {/* View chapter contents - Renders editor */}
        <button onClick = {this.props.toggleTextEditor}>View</button>





        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Chapter;
