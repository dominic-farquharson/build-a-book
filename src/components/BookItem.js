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

        {/* Viewing chapters based on book's key */}
        {/* <button onClick={()=>{this.printChapters(book); }}>View Chapter</button> */}
        {/* <button onClick={ ()=>{this.props.setBookTitle(book); this.props.toggleChapterView() } }>View Chapters</button>
        {/* Runs function to delete a book */}
        {/* <button onClick={()=>this.props.deleteBook(book.key)}>Delete Book</button> */}
        {/* Add Edit Button */}
        {/* <button onClick={()=>this.toggleEditBook(book.key)}>Edit Book</button> */}

        {/* <i className="fa fa-pencil-square-o" aria-hidden="true"></i> */}
{/*2nd card  */}
{/* <hr /> */}
<div className="uk-child-width-1-2@m" data-uk-grid>
    <div className="alignBooks">
      {/* <div className="uk-card-header">
         <h3 className="align uk-card-title">{book.title}</h3>
     </div> */}
        <div className="uk-card uk-card-default uk-box-shadow-large">
          <div className="align uk-card-title">{book.title}</div>

            <div className="uk-card-media-top">
                <img src="https://images.unsplash.com/photo-1483505806292-09b690b07d50?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=" alt="" />
            </div>
            {/* <div className="uk-card-body">
                <h3 className="uk-card-title">Media Top</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div> */}
            <div className="uk-card-footer">
              {/* Viewing chapters based on book's key */}
              {/* <button onClick={()=>{this.printChapters(book); }}>View Chapter</button> */}
              <button className="uk-button uk-button-default bookItemButton" onClick={ ()=>{this.props.setBookTitle(book); this.props.toggleChapterView() } }>View Chapters</button>
              {/* Add Edit Button */}
              <button className="uk-button uk-button-default bookItemButton" onClick={()=>this.toggleEditBook(book.key)}>Edit Book</button>
              {/* Runs function to delete a book */}
              <button className="uk-button uk-button-default bookItemButton" onClick={()=>this.props.deleteBook(book.key)}>Delete Book</button>
              {/* <h3 className="align uk-card-title">Footer:{book.title}</h3> */}

              {/* Edit Book */}
              {/* <i className="fa fa-pencil-square-o" onClick={()=>this.toggleEditBook(book.key)}  aria-hidden="true"></i> */}
              {/* Delete Book */}
              {/* <i className="fa fa-trash" onClick={()=>this.props.deleteBook(book.key)} aria-hidden="true"></i> */}
            </div>

        </div>
    </div>
</div>


        {/* Card - UIkit */}



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
