// importing react and component
import React, {Component} from 'react';

let uikit = require('uikit')
console.log(uikit)


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
      <nav>
        <p className="uk-position-bottom">Nav</p>
        <ul>
          {/* {console.log(nav.viewEditor)} */}
          {/* Printing book component within nav */}
          {/* {this.props.toggl} */}

          {/* Toggling Editor */}
          <li onClick={()=>this.toggleEdit()}>Create Chapter</li>

          {/* Toggling View All Books page */}
          <li onClick={()=>{this.props.bookView()}}>View Books</li>
          {/* <li>View All Chapter</li> */}

          <li>Account</li>
        </ul>
      </nav>
    )
  }

}


export default Navigation;
