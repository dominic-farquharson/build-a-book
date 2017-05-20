import React, {Component} from 'react';


class Statistics extends Component {
    constructor() {
        super();
        // initial state
        this.state = {
            statistics: {},
            content: false
        }
    }

    render() {
        const content = this.state.content;
        return (
            <div> {(content)? data : message}</div>
        )
    }
}


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


/*const Statistics = (props) => {
    let msg = true;
    
    return (
        <div>
            {(msg)?message:<div>None</div>}            
        </div>
    )
};*/




export default Statistics;