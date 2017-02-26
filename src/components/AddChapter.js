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
  addChapter(title, image, bookKey) {
    console.log('props',this.props)
    // user's id key
    const uid = this.props.userId;
    // url of user's chapters endpoint located within the selected book
    const url = `https://build-a-book.firebaseio.com/users/${uid}/books/${bookKey}/chapters.json`;

    // posting ot user's chapter's endpoint
    axios.post(url, {
      title:title,
      image: image
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
        <form id="addChapterForm" action="#" method="POST">
          {/* Using refs to grab input values to pass to create chapter function */}


          <label htmlFor="chapterTitle">Chapter Title</label>
          {/* Chapter Title */}
          <input id="chapterTitle" name="chapterTitle" ref={(chapterTitleInput) => {this.chapterTitleInput=chapterTitleInput}} type="text" placeholder="Chapter Title" required />

          <label htmlFor="chapterImage">Chapter Image</label>
          {/* Chapter Image Cover */}
          <input name="chapterImage" ref={(chapterImage) => {this.chapterImageInput=chapterImage}} type="text" placeholder="Insert Image Url" required />
          {/*
            Posting book info to firebase
            Passing chapter title and image cover
          */}
          <input type="button" value="Create Chapter" onClick={()=>this.addChapter(this.chapterTitleInput.value, this.chapterImageInput.value, this.props.bookKey)} />

        </form>
      </div>
    )
  }
}



export default AddChapter;
