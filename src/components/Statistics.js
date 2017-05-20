import React, {Component} from 'react';


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




const Statistics = (props) => {
    // checking if object is empty
    const length = Object.keys(props.book).length;
    console.log(`book data: ${props.book}`);

    /* Simulating content */
    const data = (
        <section>
            I am data
        </section>
    );



    return (
        <div>
            {/* Returning data if content */}
            { (length > 0) ? data : noData }            
        </div>
    )
}




export default Statistics;