// importing react and component
import React, {Component} from 'react';

// importing Axios
import axios from 'axios';

// importing Firebase
import * as firebase from "firebase";

// creating AddChapter component
class AddChapter extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    /*
     Add Chapter renders when book is undefined or add Chapter state is toggled. When book is undefined addChapter state is still false. 
     This would cause add chapter to reopen when the cancel button was clicked.
   */ 
    if(this.props.books ===undefined && !this.props.addChapter) {
      // changing add chapter's state is true when user has no chapters
      this.props.toggleAddChapter();
    }
  }


  // function to post chapter title and image to firebase
  addChapter(title, description, bookKey) {
    //console.log(`title:${title}, description: ${description}`)
    // user's id key
    const uid = this.props.userId;
    // object containing new Chapter information
    let newChapter = {
      title,
      description
    }

    // getting new chapter key
    let newChapterKey = firebase.database().ref(`/users/${uid}/books/${bookKey}/chapters/`).push().key;
    
    // chapter data to be posted, initially an empty object
    let chapter = {};
    // pushing new Chapter endpoint into chapter object
    chapter[`users/${uid}/books/${bookKey}/chapters/${newChapterKey}/`] = newChapter;
    // writing new chapter to chapters endpoint
    firebase.database().ref().update(chapter)
    // adding promise, to update state of books after new book is added
    .then( ()=> {
      alert('chapter has been added')
      // updating state of chapters after new chapter is added
      this.props.toggleAddChapter();
    })
    
    return;
  }

  render() {
    return (
      <div id="addChapterDiv">
        {/* Create Chapter Form */}
        <form id="addChapterForm" className="uk-position-center" action="#" method="POST">
          <h1>Add A Chapter</h1>        
          {/* Using refs to grab input values to pass to create chapter function */}
          <label htmlFor="chapterTitle">Chapter Title</label>
          {/* Chapter Title */}
          <input className="addChapterInput uk-input" id="chapterTitle" name="chapterTitle" ref={(chapterTitleInput) => {this.chapterTitleInput=chapterTitleInput}} type="text" placeholder="Chapter Title" required />

          <label htmlFor="chapterDescription">Chapter Description</label>
          {/* Chapter Description */}
          <textarea className="addChapterInput" name="chapterDescription" ref={(chapterDescription) => {this.chapterDescriptionInput=chapterDescription}} placeholder="Chapter Description" required></textarea>

          {/*
            Posting book info to firebase
            Passing chapter title and image cover
          */}
          <input className="addChapterButton uk-button uk-button-default" type="button" value="Create Chapter" onClick={()=>this.addChapter(this.chapterTitleInput.value, this.chapterDescriptionInput.value, this.props.bookKey)} />
          <input className="addChapterButton uk-button uk-button-default" type="button" value="Close" onClick={()=>this.props.toggleAddChapter()} />


        </form>
      </div>
    )
  }
}



export default AddChapter;
