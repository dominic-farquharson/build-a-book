import React, {Component} from 'react';

class BookStat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>{this.props.title}</li>
        )
    }
}

export default BookStat;