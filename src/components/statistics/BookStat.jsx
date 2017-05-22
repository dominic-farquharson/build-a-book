import React, {Component} from 'react';
// importing firebase
import * as firebase from "firebase";

// individual books on Statistics page
class BookStat extends Component {
    constructor(props) {
        super(props);
        // initial state 
        this.state = {
            viewStats: false
        }
    }

    render() {
        // setting props to a variable
        const book = this.props;
        // default image
        const defaultImage = 'http://placehold.it/250x250';


        const chapters = this.props.chapters;
        const chapterKeys = this.props.chapterKeys;
        // if(chapters) {
        // let data = chapterKeys.map( (key) => chapters[key]['latestEdit']);
        // console.log('data', data)
        
        // }

        
        return (
            <li>
                <img 
                    style={ {width: '20vw', height: '20vh'} } 
                    src={book.cover || defaultImage } 
                     // toggling state 
                    onClick={()=> book.viewStats(book.bookKey)}
                />
                <h2>{book.title}</h2>
                <p>Chapters: { book.chapterCount } <br /> Last Edited: <br /> {book.latestEdit['time'] || '---' }<br /> Character Count: </p>
                {/* View Stats Button */}
                <button 
                    onClick={()=> book.viewStats(book.bookKey)}
                >
                    View More Statistics
                </button>
            </li>
        )
    }
}

export default BookStat;