import React, {Component} from 'react';
import BookStat from './statistics/BookStat.jsx';


class Statistics extends Component {
    constructor() {
        super();
        // initial state
        this.state = {
            statistics: {},
            // content: false,
            length: 0,
            viewStats: false,
            bookKey: ''
        }
    }

    componentWillMount() {
        // checking if object is empty - user doesn't have books        
        const length = Object.keys(this.props.book).length;
        this.setState({length})  
    }

/*
Change name to toggle stat

************/

    // Toggling State - viewing statistics for a book
    viewStatistics(bookKey) {
        if(this.state.viewStats) {
            return this.setState({viewStats: false, bookKey: ''})
        }
        // setting state of book Key
        this.setState({bookKey, viewStats: true});
        
        console.log('book is', this.props.book[bookKey]);
        // this.renderStat(bookKey);
    }



    // Printing Statistics
    printStatistics(books) {
        // console.log('checking book', books)

        // mapping over books
        const titles = Object.keys(books).map( 
            (bookKey, i) => (
                <BookStat 
                    key={i} 
                    // Passing chapters down as prop. First checking if chapters is defined - if undefined chapter count is 0
                    chapterCount={  (books[bookKey].hasOwnProperty('chapters') )?   Object.keys(books[bookKey]['chapters']).length : 0}
                    title={books[bookKey].title} 
                    cover={books[bookKey]['cover']} 
                    bookKey={bookKey} 
                    viewStats={(key)=> this.viewStatistics(key)} />
            )
        );

        // State of inidividual stat - initially false
        const viewStats = this.state.viewStats;


        // Printing Individual Book Stats     
        let indStat = (
            <section>
                {/* Printing Title */}
                <h1>{(this.state.bookKey!== '')? books[this.state.bookKey]['title']: null}</h1>
                {/* Printing Book Info */}
                <div> 
                    {/* Mapping over chapters */}
                    {   // Checking if book has chapters
                        ( this.state.bookKey !== '' && books[this.state.bookKey].hasOwnProperty('chapters') )? 
                            <ul>
                                {Object.keys(books[this.state.bookKey]['chapters']).map(
                                    (key, i)=> <li key={i}>{books[this.state.bookKey]['chapters'][key].title}</li>
                                )} 
                                <button className={(this.state.bookKey=='')? 'noBooks' : 'booksPresent'} onClick={()=> this.viewStatistics()}>Cancel</button>                 
                            </ul> 
                            : (
                                <section>
                                    <p>You don't have any chapters yet! Check back here when you add some!</p>
                                    <button onClick={()=> this.viewStatistics()}>Cancel</button>                 
                                </section>
                              )
                    }
                </div>
            </section>
        );

        // Checking if state has updated
        if( this.state.bookKey !== '' ) {
            return indStat;      

        } else {
            // printing all the books
            return (
                <section 
                    style={ 
                        {overflow: 'scroll', height: '100vh', margin: '0 auto', position: 'absolute', top: '0', left: '20%', width: '80vw'} 
                    } 
                >
                    <h1 className="title">Statistics View</h1>                    
                    <ul>
                        {/* Printing books - Book Stats component */}
                        {titles}
                    </ul>
                </section>
            )
        }
    }


    
    render() {
        // checking if object is empty
        const length = this.state.length;
        const props = this.props;
        return (
            <div>
                {/* Returning data if content */}
                { (length > 0) ? this.printStatistics(props.book) : noData }            
            </div>
        )
    }

   
};


/* Message when there are no statistics */
const noData = (
    <section style={ {position: 'absolute', left: '20%', width: '80%'} }>      
        <h1 className="title">Statistics View</h1>    
        <p>
            {/* Credit: Shesfittolead.com */}
            <img src="../public/assets/i-feel-empty.gif" title="No Statistics" alt="No Statistics" />
            <br />
            Check back here to view your writing statistics. <br /> This is only available for writers NOT pretenders. 
        </p>
        <h2>Get to writing!</h2>  
    </section>
);


export default Statistics;