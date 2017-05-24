import React from 'react';

// Component to View an individual book's statistics
const ChapterStat = (props) => {
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
            <ul className="statContainer viewStat" style={ {overflow: 'scroll', height: '100vh', margin: '0 auto', position: 'absolute', top: '0', left: '20%', width: '80vw'} } >
                {/* Printing Title */}
                <h1 className="title">{(bookKey!== '')? books[bookKey]['title']: null}</h1>
                {/* Book cover */}
                <img src={books[bookKey]['cover'] || defaultImage } />

                {/* Table Headings */}
                <li>
                    <span>Title</span> 
                    <span>Last Update</span>                  
                    <span>Character Count</span>  
                    {/*<span>Last Edit</span>                                                                                                          */}
                </li>   

                {/* Mapping over chapters */}
                {Object.keys(books[bookKey]['chapters']).map(
                    (key, i)=> 
                        <li key={i}>
                            <span>{books[bookKey]['chapters'][key].title}</span>
                            {/* Time of last edit */}
                            <span>{(books[bookKey]['chapters'][key].hasOwnProperty('latestEdit'))?books[bookKey]['chapters'][key]['latestEdit']['time'] : '---'}</span>
                            {/* Latest Character count */}
                            <span>{(books[bookKey]['chapters'][key].hasOwnProperty('latestEdit'))?books[bookKey]['chapters'][key]['latestEdit']['characters'] : '---'}</span> 
                             {/* View Edit History Button - toggles state in statistics component */}
                            { (books[bookKey]['chapters'][key].hasOwnProperty('content'))? (
                          
                                ( typeof books[bookKey]['chapters'][key]['content'] === 'object' && Object.keys(books[bookKey]['chapters'][key]['content']).length > 1)? (
                            <button 
                                onClick={()=> {props.viewEditHistory(key)}}
                            >
                                View Edit History 
                            </button> ) :null ) : null}
                        </li>
                )} 
                {/*<button className={(bookKey=='')? 'noBooks' : 'booksPresent'} onClick={()=> props.viewStatistics()}>Cancel</button>                 */}
            </ul> 
        );
    };

    // no chapters 
    const noChapters = (
        <section>
            <p>You don't have any chapters yet! Check back here when you add some!</p>
            {/*<button onClick={()=> props.viewStatistics()}>Cancel</button>                 */}
        </section>
    );  


    return (
            <section>
                {/* Printing Book Info */}
                <div> 
                    {/* Close/Back Button */}
                    <i 
                        className="statsBack fa fa-chevron-circle-left fa-2x" aria-hidden="true" 
                        // close button
                        onClick={()=> props.viewStatistics()}
                    ></i>
                    {   // Checking if book has chapters
                        ( bookKey !== '' && hasChapters )? chapters: noChapters
                    }
                </div>
            </section>
    )    
};



export default ChapterStat;