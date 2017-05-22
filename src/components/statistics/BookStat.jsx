import React, {Component} from 'react';

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

        // const char = this.props.characterCount;

        // let chapters = Object.keys(char);

        // length of character count object
        // console.log(x)

        // checking if there are chapters
        if(this.props.chapters) {
            let content = this.props.chapterKeys.map( key => this.props.chapters[key]['content']);
            let length = content.length;
            console.log('chapters', content, length)
        }
        // console.log('chapters', this.props.chapters, 'chapterKeys', this.props.chapterKeys)

        // const chapters = Object.keys(this.props.characterCount);
        // const latestEdit = this.props.characterCount[chapters.length];
        // console.log(`latest edit: ${latestEdit}`)

        
        return (
            <li>
                <img 
                    style={ {width: '20vw', height: '20vh'} } 
                    src={book.cover || defaultImage } 
                     // toggling state 
                    onClick={()=> book.viewStats(book.bookKey)}
                />
                <h2>{book.title}</h2>
                <p>Chapters: { book.chapterCount } <br /> Last Edited: today <br /> Character Count: </p>
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