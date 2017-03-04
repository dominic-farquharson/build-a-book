// importing react and component
import React, {Component} from 'react';

class BookItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editBook: false
    }

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
        <div className="uk-child-width-1-2@m" data-uk-grid>
            <div className="alignBooks">
                <div className="uk-card uk-card-default uk-box-shadow-large">
                  <div className="align uk-card-title">{book.title}</div>

                    <div className="uk-card-media-top">
                        <img src="https://images.unsplash.com/photo-1483505806292-09b690b07d50?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=" alt="" />
                    </div>

                    <div className="uk-card-footer">
                      {/* Viewing chapters based on book's key */}
                      <button className="uk-button uk-button-default bookItemButton" onClick={ ()=>{this.props.setBookTitle(book); this.props.toggleChapterView() } }>View Chapters</button>
                      {/* Add Edit Button */}
                      <button className="uk-button uk-button-default bookItemButton" onClick={()=>this.toggleEditBook(book.key)}>Edit Book</button>
                      {/* Runs function to delete a book */}
                      <button className="uk-button uk-button-default bookItemButton" onClick={()=>this.props.deleteBook(book.key)}>Delete Book</button>
                    </div>

                </div>
            </div>
        </div>
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
       </div>
       <div>
         {/* Chapter Image input box filled w/ value of title */}
         <label htmlFor="chapterImage">Image:</label>
       </div>
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
