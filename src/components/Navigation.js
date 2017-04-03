// importing react and component
import React, {Component} from 'react';

// let uikit = require('uikit')
// console.log(uikit)


class Navigation extends Component {
  constructor(props) {
    super(props);

    // binding functions 
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
    const nav = this.props;
    return (
      <nav className="navigationMenu">
        <p className="logo uk-position-bottom">&copy; Build A Book</p>
        <ul>
  
          {/* Toggling View All Books page */}
          <li onClick={()=>{nav.bookView()}}>Books</li>

          {/* Showing Book Statistics using D3??? */}
          <li onClick={()=>{nav.statisticsView()} }>Statistics</li>

          {/* User Account Info */}
          <li onClick={()=> nav.toggleAccount()}>
            <img src={nav.profilePic} style={{width:"50px", height:"50px", marginRight:"10px", borderRadius:"100%"}} />
            Account
          </li>

          {/* Log Out Button */}
          <li onClick={()=>nav.logOut()}> Log Out </li>
        </ul>
      </nav>
    )
  }

}


export default Navigation;
