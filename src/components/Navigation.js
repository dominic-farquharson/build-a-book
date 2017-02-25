// importing react and component
import React, {Component} from 'react';

let uikit = require('uikit')
console.log(uikit)


class Navigation extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <nav>
        <p className="uk-position-bottom">Nav</p>
      </nav>
    )
  }

}


export default Navigation;
