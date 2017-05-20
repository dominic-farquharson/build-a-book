import React, {Component} from 'react';
import BookStat from './statistics/BookStat.jsx';


// class Statistics extends Component {
//     constructor() {
//         super();
//         // initial state
//         this.state = {
//             statistics: {},
//             content: false
//         }
//     }

//     componentWillMount() {

//     }

//     render() {
//         const content = this.state.content;
//         return (
//             <div> {(content)? data : message}</div>
//         )
//     }
// }


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

// Printing Statistics
const printStatistics = (books) => {
    const titles = Object.keys(books).map( (bookKey, i) => <BookStat key={i} title={books[bookKey].title} />);

    // let okay =Object.keys(data)[0]
    return <ul>{titles}</ul>
};




const Statistics = (props) => {
    // checking if object is empty
    const length = Object.keys(props.book).length;
    console.log(`book data: ${props.book}`);

    /* Simulating content */
    /*const data = (
        <section>
            I am data
        </section>
    );*/



    return (
        <div>
            {/* Returning data if content */}
            { (length > 0) ? printStatistics(props.book) : noData }            
        </div>
    )
}




export default Statistics;