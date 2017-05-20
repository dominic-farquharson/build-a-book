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
            viewStats: false
        }
    }

    componentWillMount() {
        // checking if object is empty - user doesn't have books        
        const length = Object.keys(this.props.book).length;
        this.setState({length})  
    }

    // Toggling State - viewing statistics for a book
    viewStatistics() {

    }


    // Printing Statistics
    printStatistics(books) {
        const titles = Object.keys(books).map( 
            (bookKey, i) => <BookStat key={i} title={books[bookKey].title} cover={books[bookKey]['cover']} bookKey={bookKey} />
        );

        // State of inidividual stat - initially false
        const viewStats = this.state.viewStats;

        const indStat = (<h1>I am a single stat</h1>);
        if(viewStats) {
            return indStat;
        }
        // let okay =Object.keys(data)[0]
        return (
            <section 
                style={ 
                    {overflow: 'scroll', height: '100vh', margin: '0 auto', position: 'absolute', top: '0', left: '20%', width: '80vw'} 
                } 
            >
                <h1 className="title">Statistics View</h1>                    
                <ul>
                {titles}
                </ul>
            </section>
        )
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





// const Statistics = (props) => {
//     // checking if object is empty
//     const length = Object.keys(props.book).length;
//     console.log(`book data: ${props.book}`);

    /* Simulating content */
    /*const data = (
        <section>
            I am data
        </section>
    );*/


// /*
//     return (
//         <div>
//             {/* Returning data if content */}
//             { (length > 0) ? printStatistics(props.book) : noData }            
//         </div>
//     )
// }*/




export default Statistics;