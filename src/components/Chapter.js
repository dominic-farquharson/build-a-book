// importing react and component
import React, {Component} from 'react';

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
    return (
      <div>

        {/* Printing Book Title */}
        <h3>{this.state.title}</h3>
        {/* printing chapters */}
        {this.props.chapter}
        {/* <p>{this.props.chapters['chapter1']['title']}}</p> */}
        <button onClick = {this.props.toggleTextEditor}>View</button>
        {/* Last modified from moment? */}
     </div>
    )
  }
}



export default Chapter;
