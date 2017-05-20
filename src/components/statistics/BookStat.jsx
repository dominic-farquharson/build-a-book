import React, {Component} from 'react';

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
        const defaultImage= 'http://placehold.it/250x250';
        
        return (
            <li>
                <h2>{book.title}</h2>
                <img 
                    style={ {width: '33vw', height: '33vh'} } 
                    src={book.cover || defaultImage } 
                    onClick={()=>console.log('book key', book.bookKey)}
                />
            </li>
        )
    }
}

export default BookStat;