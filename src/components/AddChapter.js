// importing react and component
import React, {Component} from 'react';

// importing Axios
import axios from 'axios';

// creating AddChapter component
class AddChapter extends Component {
  constructor(uid) {
    super(uid);
  }

  // function to post chapter title and image to firebase
  addChapter(title, description, bookKey) {
    console.log(`title:${title}, description: ${description}`)
    // user's id key
    const uid = this.props.userId;
    // url of user's chapters endpoint located within the selected book
    const url = `https://build-a-book.firebaseio.com/users/${uid}/books/${bookKey}/chapters.json`;

    // posting ot user's chapter's endpoint
    axios.post(url, {
      title:title,
      description: description
    })
    .then( (response) => {
      console.log('New Chapter has been created', response);
      alert('chapter has been added')
      this.props.toggleAddChapter();
      // updating state of chapters after new chapter is added
      // this.props.getBooks();
      // setting add chapter's form's state to false - rendering all chapters view
      // this.toggleAddBook();

    })
    .catch( (error) => {
      console.log('error posting new book', error)
    })

  // will need to fetch chapters within promise
  }

  render() {
    return (
      <div>
        {/* <h1>BookKey: {this.props.bookKey}</h1> */}
        {/* Create Chapter Form */}
        <form id="addChapterForm" className="uk-position-center" action="#" method="POST">
          {/* Using refs to grab input values to pass to create chapter function */}


          <label htmlFor="chapterTitle">Chapter Title</label>
          {/* Chapter Title */}
          <input className="addChapterInput uk-input" id="chapterTitle" name="chapterTitle" ref={(chapterTitleInput) => {this.chapterTitleInput=chapterTitleInput}} type="text" placeholder="Chapter Title" required />

          <label htmlFor="chapterDescription">Chapter Description</label>
          {/* Chapter Description */}
          {/* <input name="chapterDescription" ref={(chapterDescription) => {this.chapterDescriptionInput=chapterDescription}} type="text" placeholder="Chapter Description" required /> */}
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
