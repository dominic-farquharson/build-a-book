// importing react and component
import React, {Component} from 'react';

// importing axios
import axios from 'axios';

// importing Firebase
import * as firebase from "firebase";

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
    //console.log(`title:${title}, descpription:${description}`)

    // Key of book where chapter is located
    let bookKey = this.props.bookKey; 
    // key of chapter to be edited
    let chapterKey = this.props.chapterKey; 

    // object containing new chapter title and description
    let chapter = {title, description}
    // User Id
    const uid = this.props.userId;
    // endpoint of book to be edited
    let endpoint = `/users/${uid}/books/${bookKey}/chapters/${chapterKey}`;
    // Updating book
    let updatedChapter = firebase.database().ref(endpoint).update(chapter)
      // promise 
      .then( ()=> {
        // notifying user
        alert('Chapter has been successfully edited.')
        // Closing Chapter Edit - toggling edit state to false
        this.toggleChapterEdit();
      })

  }

  // delete chapter
  deleteChapter(chapterKey) {
    // user id
    const uid= this.props.userId;
    // book Key
    const bookKey = this.props.bookKey;
    /*
     prompt user if they want to delete a chapter - using Electron's dialog box, accessing it via remote to use it in the renderer process
     Function returns the index of the button clicked
    */
    let userInput = deletePrompt(
      'Delete A Chapter',  
      'Are you sure you want to delete this chapter?', 
      'Note: The chapter and all of its contents will be deleted. This process can NOT be reversed'
    );

    // 0 is index of yes button
    if(userInput===0) {
      console.log('user selected yes')
      // Deleting book based on Book's key
      let chapter = firebase.database().ref(`/users/${uid}/books/${bookKey}/chapters/${chapterKey}`).remove();
      // notifying user
      alert('The chapter has been deleted.')
    }
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
                      {/* Printing chapter description */}
                      <p>{chapter.description}</p>
                      {/* Description for {chapter.chapterTitle} */}
                    </div>
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
