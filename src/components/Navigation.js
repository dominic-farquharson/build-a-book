// importing react and component
import React, {Component} from 'react';

let uikit = require('uikit')
// console.log(uikit)


class Navigation extends Component {
  constructor(props) {
    super(props);

    // binding functions, even though fat arrow being used
    this.toggleView = this.toggleEdit.bind(this)

  }

  // toggles state of editor
  toggleEdit () {
    console.log('Toggle View has run', this.props.viewEditor)
    if(this.props.viewEditor == false)
      this.props.toggleEdit()
  }

  // toggles state of chaptes
  toggleChapter() {

  }

  render() {
    // const nav = this.props;
    return (
      <nav className="navigationMenu">
        <p className="logo uk-position-bottom">Build A Book</p>
        <ul>
          {/* Toggling Create New Book */}
          {/* <li onClick={()=>this.toggleEdit()}>Create New Book</li> */}

          {/* Toggling View All Books page */}
          <li onClick={()=>{this.props.bookView()}}>Books</li>

          {/* Showing Book Statistics using D3??? */}
          <li>Statistics</li>

          {/* User Account Info */}
          <li>Account</li>
          {/* Log Out Button */}
          <li> Log Out </li>
        </ul>
      </nav>
    )
  }

}


export default Navigation;
