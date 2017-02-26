// importing react and component
import React, {Component} from 'react';

// creating Chapter component
class Chapter extends Component {
  constructor(props) {
    super(props);
    // inital state
    this.state = {
      title: 'Untitled',
      edit: false
    }
  }
  // Toggling view when component mounts
  componentDidMount() {
    // setting title of Chapter
    this.setState({title: this.props.title})
  }

  // toggling chapter edit state
  toggleChapterEdit() {
    // sets state of edit to false if true
    if(this.state.edit) {
      this.setState({edit: false});
    }
    // sets state of edit to true if false
    else {
      this.setState({edit: true});

    }
  }

  render() {
    console.log('chapter key', this.props.key)

    // setting chapter to this.props
    const chapter = this.props;
    console.log(chapter)
    // renders when edit state is false - prints all chapters
    if(!this.state.edit) {
    return (
      <div>

        {/* Printing Book Title */}
        {/* <h3>Title: {this.state.title}</h3> */}

        {/* printing chapters */}
        <div>
          <p>Title: {chapter.chapterTitle}</p>
          <p>Image: {chapter.chapterImage}</p>
          {/* Edit Chapter button */}
          <button onClick = {()=> this.toggleChapterEdit()}>Edit chapter</button>

        </div>

        {/* Adding A Chater Button - toggles Add Chapter component*/}
        <div>
          <button onClick={this.props.toggleAddChapter}>Add A Chapter</button>
        </div>

        {/* View chapter contents - Renders editor */}
        <button onClick = {this.props.toggleTextEditor}>View</button>
        {/* Last modified from moment? */}
        <hr />
     </div>
    )
  }
  else {
    return(
      <div>
        <div>
          {/* Chapter title Input Box filled w/ value of title */}
          <input type="text" defaultValue={chapter.chapterTitle} require />
        </div>
        <div>
          {/* Chapter Image input box filled w/ value of title */}
          <input type="text" defaultValue={chapter.chapterImage} require />
        </div>
        <button onClick = {()=> this.toggleChapterEdit()}>Close</button>
        <hr />
      </div>
    )
  }

  }
}



export default Chapter;
