// importing react and component
import React, {Component} from 'react';

// creating AddChapter component
class AddChapter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
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
            Posting user info to firebase
            Passing password, email to createuser function
          */}
          <input type="button" value="Create Chapter" onClick={()=>console.log('creating chapter') } />
          {/* this.props.add(this.emailInput.value, this.passwordInput.value, this.displayNameInput.value); }} /> */}
        </form>
      </div>
    )
  }
}



export default AddChapter;
