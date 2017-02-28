// importing react and component
import React, {Component} from 'react';

// creating Account component
class Account extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    // variable declaration
    const user = this.props;
    return (
      <div><h1>Hello {user.name}</h1></div>
    )
  }

}



export default Account;
