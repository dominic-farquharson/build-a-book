// importing react and component
import React, {Component} from 'react';

class BookItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editBook: false
    }

    // binding functions, even though fat arrow being used
    // this.toggleView = this.toggleEdit.bind(this)

  }


  // toggles state of book edit
  toggleEditBook() {
    console.log('toggling edit book')
    // sets state of addChapter to false if true
    if(this.state.editBook) {
      this.setState({editBook: false});
      // axios call to update books after posting
      this.props.getBooks();
      // rendering Add Chapter Component
      this.props.printBookTitles();
    }
    // sets state of addchapter to true if false
    else {
      this.setState({editBook: true});

    }
  }


  render() {
    // setting book to this.props for readability
    const book = this.props;
    // prints books when edit state false
    if(!this.state.editBook){
    // const nav = this.props;
    return (
      <div>
        {/* Printing book title */}
        <p>{book.title}</p>
        <br />
        {/* Viewing chapters based on book's key */}
        {/* <button onClick={()=>{this.printChapters(book); }}>View Chapter</button> */}
        <button onClick={ ()=>{this.props.setBookTitle(book); this.props.toggleChapterView() } }>View Chapters</button>
        {/* Runs function to delete a book */}
        <button onClick={()=>this.props.deleteBook(book.key)}>Delete Book</button>
        {/* Add Edit Button */}
        <button onClick={()=>this.toggleEditBook(book.key)}>Edit Book</button>
        <hr />
        
      </div>
    )
  }
  // Rendering input fields when edit state true
  else {
    return(
      <div>
       <h3>Edit {this.props.title}</h3>
       <div>

         {/* Chapter title Input Box filled w/ value of title */}
         <label htmlFor="bookTitle">Title: </label>
         <input id="bookTitle" name="bookTitle" type="text" ref={(bookTitleInput) => {this.bookTitleInput=bookTitleInput}} defaultValue={book.title} required />

         {/* <input id="chapterTitle" name="chapterTitle" type="text" ref={(chapterTitleInput) => {this.chapterTitleInput=chapterTitleInput}} defaultValue={chapter.chapterTitle} required /> */}
       </div>
       <div>
         {/* Chapter Image input box filled w/ value of title */}
         <label htmlFor="chapterImage">Image:</label>
         {/* <input id="chapterImage" name="chapterImage" type="text" ref={(chapterImage) => {this.chapterImageInput=chapterImage}} defaultValue={chapter.chapterImage} required /> */}
       </div>
       {/* Grabbing updated title and image */}
       {/* <button onClick={ ()=> this.updateChapterInfo(this.chapterTitleInput.value, this.chapterImageInput.value)}>Save</button> */}
       {/* Toggling Edit state - closing chapter Info editor  */}
       <button onClick = {()=> this.toggleEditBook()}>Close</button>

       {/* Button to edit book - PUT request - grabbing book key and new book title */}
       <button onClick = {()=> this.props.editBook(book.bookKey, this.bookTitleInput.value)}>Edit</button>

       <hr />
     </div>
  )
  }

}

}


export default BookItem;
