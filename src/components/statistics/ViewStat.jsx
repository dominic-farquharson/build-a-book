import React from 'react';

// Component to View an individual book's statistics
const ViewStat = (props) => {
    // setting variables
    const books = props.books;
    const bookKey=props.bookKey;
    // checking if book has chapters
    const hasChapters = books[props.bookKey].hasOwnProperty('chapters');
    // default image
    const defaultImage= 'http://placehold.it/250x250';
    // preventing chapters from being undefined - initially an empty object
    let chapters = {};

    // checking if there are chapters 
    if( hasChapters && bookKey !== '') {
        console.log('i have chapters')
        // Printing chapter data
        chapters = (
            <ul>
                {/* Book cover */}
                <img src={books[bookKey]['cover'] || defaultImage } />
                {/* Mapping over chapters */}
                {Object.keys(books[bookKey]['chapters']).map(
                    (key, i)=> <li key={i}>{books[bookKey]['chapters'][key].title}</li>
                )} 
                <button className={(bookKey=='')? 'noBooks' : 'booksPresent'} onClick={()=> props.viewStatistics()}>Cancel</button>                 
            </ul> 
        );
    };

    // no chapters 
    const noChapters = (
        <section>
            <p>You don't have any chapters yet! Check back here when you add some!</p>
            <button onClick={()=> props.viewStatistics()}>Cancel</button>                 
        </section>
    );  


    return (
            <section>
                {/* Printing Title */}
                <h1>{(bookKey!== '')? books[bookKey]['title']: null}</h1>
                {/* Printing Book Info */}
                <div> 
                    {   // Checking if book has chapters
                        ( bookKey !== '' && hasChapters )? chapters: noChapters
                    }
                </div>
            </section>
    )    
};



export default ViewStat;