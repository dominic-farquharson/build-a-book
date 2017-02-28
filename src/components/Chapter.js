// importing react and component
import React, {Component} from 'react';

// importing axios
import axios from 'axios';

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
      // ajax call to update books object after posting to chapters endpoint
      this.props.getBooks();
      // rendering Add Chapter Component
      this.props.printChapters();
    }
    // sets state of edit to true if false
    else {
      this.setState({edit: true});

    }
  }

  // Saving Edited Chapter Info
  updateChapterInfo(title, description) {
    console.log(`title:${title}, image:${description}`)

    // url for chapter endpoint - based on user's id, the book key, and the chapter's key
    const url = `https://build-a-book.firebaseio.com/users/${this.props.userId}/books/${this.props.bookKey}/chapters/${this.props.chapterKey}.json`;

    // Put request to update chapter endpoint with new chapter title and image
    axios.put(url, {
      title:title,
      description: description
    })
    .then( (response) => {
      console.log(`updated title`);
      this.toggleChapterEdit();
    })
    .catch( (error) => {
      console.log('error updating title and image')
      this.toggleChapterEdit();
    })
    // Closing Chapter Edit - toggling edit state to false
  }

  // delete chapter
  deleteChapter(key) {
     console.log(`deleting chapter of key ${key}`);
    // Chapter endpoint - based on userid, the book key and the chapter's key
    const url = `https://build-a-book.firebaseio.com/users/${this.props.userId}/books/${this.props.bookKey}/chapters/${this.props.chapterKey}.json`;

    // Put request to update chapter endpoint with new chapter title and image
    axios.delete(url)
    .then( (response) => {
      alert('chapter has been deleted!');
      // refreshing books object after chapter has been deleted
      this.props.getBooks();
      // printing out chapters based on refreshed book object
      this.props.printChapters();
    })
    .catch( (error) => {
      alert('error deleting title');
      // refreshing books object after chapter has been deleted
      this.props.getBooks();
      // printing out chapters based on refreshed book object
      this.props.printChapters();

    })

   console.log(`deleting chapter of key ${key}`)
}
  render() {
    // console.log('chapter key', this.props.key)

    // setting chapter to this.props
    const chapter = this.props;
    // chapter's unique key
    let chapterKey = chapter.chapterKey;
    // console.log(chapter)

    // renders when edit state is false - prints all chapters
    if(!this.state.edit) {
    return (
      <div>

        {/* Printing Book Title */}
        {/* <h3>Title: {this.state.title}</h3> */}

        {/* printing chapters */}
        {/* <div> */}
          {/* <p>Title: {chapter.chapterTitle}</p> */}
          {/* <p>Image: {chapter.chapterDescription}</p> */}
          {/* Edit Chapter button */}
          {/* <button onClick = {()=> this.toggleChapterEdit()}>Edit chapter</button> */}

          {/* Delete Chapter Button - using unique chapter key */}
          {/* <button onClick = {()=> this.deleteChapter(chapterKey)}>Delete chapter</button> */}


        {/* </div> */}

        {/* Adding A Chater Button - toggles Add Chapter component*/}
        {/* <div> */}
          {/* <button onClick={this.props.toggleAddChapter}>Add A Chapter</button> */}
        {/* </div> */}

        {/* View chapter contents - Renders editor */}
        {/* <button onClick = {this.props.toggleTextEditor}>View</button> */}
        {/* Last modified from moment? */}
        {/* <hr /> */}
{/* Card - For Chapters View */}
<div className="uk-child-width-1-2@m" data-uk-grid>
    <div className="alignBooks">
      {/* <div className="uk-card-header">
         <h3 className="align uk-card-title">{chapter.chapterTitle}</h3>
     </div> */}
        <div className="uk-card uk-card-default uk-box-shadow-large">
            <div className="uk-card-title">{chapter.chapterTitle}</div>
            <hr />
            <div className="uk-card-body">
              {/* {console.log('chapter', chapter)} */}

              {/* Printing chapter description */}
              <p>{chapter.description}</p>
              {/* Description for {chapter.chapterTitle} */}
            </div>
            {/* <div className="uk-card-media-top"> */}
                {/* {chapter.image} */}
                {/* <img src=" http://placehold.it/350x150" alt={chapter.chapterTtile} /> */}
                {/* <img src="https://images.unsplash.com/photo-1483505806292-09b690b07d50?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=" alt="" /> */}

            {/* </div> */}
            <div className="uk-card-footer">
              {/* Viewing chapters based on book's key */}
              {/* <button onClick={()=>{this.printChapters(book); }}>View Chapter</button> */}
              <button className="uk-button uk-button-default bookItemButton" onClick = {this.props.toggleTextEditor}>View Chapter</button>
              {/* Runs function to delete a book */}
              <button className="uk-button uk-button-default bookItemButton" onClick = {()=> this.deleteChapter(chapterKey)}>Delete Chapter</button>
              {/* Add Edit Button */}
              <button className="uk-button uk-button-default bookItemButton" onClick = {()=> this.toggleChapterEdit()}>Edit Chapter</button>

            </div>

        </div>
    </div>
</div>




     </div>
    )
  }
  // Rendering Text Inputs to edit chapter title and image
  else {
    return(
      <div>
        <h3>Edit {chapter.chapterTitle}</h3>
        <div>
          {/* Chapter title Input Box filled w/ value of title */}
          <label htmlFor="chapterTitle">Title: </label>
          <input className="editChapterInput" id="chapterTitle" name="chapterTitle" type="text" ref={(chapterTitleInput) => {this.chapterTitleInput=chapterTitleInput}} defaultValue={chapter.chapterTitle} required />
        </div>
        <div>
          {/* Chapter Description input box filled w/ value of Description */}
          <label htmlFor="chapterDescription">Description:</label>
          <textarea className="editChapterTextarea" name="chapterDescription" ref={(chapterDescription) => {this.chapterDescriptionInput=chapterDescription}} defaultValue={chapter.description} required></textarea>

          {/* <input id="chapterDescription" name="chapterDescription" type="text" ref={(chapterDescription) => {this.chapterDescriptionInput=chapterDescription}} defaultValue={chapter.chapterDescription} required /> */}

        </div>
        {/* Grabbing updated title and image */}

        <button className="addChapterButton uk-button uk-button-default" onClick={ ()=> this.updateChapterInfo(this.chapterTitleInput.value, this.chapterDescriptionInput.value)}>Save</button>
        {/* Toggling Edit state - closing chapter Info editor  */}
        <button className="addChapterButton uk-button uk-button-default" onClick = {()=> this.toggleChapterEdit()}>Close</button>
        <hr />
      </div>
    )
  }

  }
}



export default Chapter;
