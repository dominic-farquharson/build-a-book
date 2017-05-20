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
const message = (
    <section>
        <p>Start writing so you can view your statistics!</p>
    </section>
);

/* Simulating content */
const data = (
    <section>
        I am data
    </section>
)


const Statistics = (props) => {
    // checking if object is empty
    const length = Object.keys(props.book).length;
    console.log('length', length)
    return (
        <div>
            { (length > 0) ? message:<div>None</div> }            
        </div>
    )
}




export default Statistics;