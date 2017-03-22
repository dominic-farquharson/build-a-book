// importing react and component
import React, {Component} from 'react';

// creating Account component
class Account extends Component {
  constructor(props) {
    super(props);
    // binding function
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  // Making React control state of form
  handleSubmit(event) {
    console.log('submitted changes')
    event.preventDefault();
    console.log('props', this)
    this.props.updatePicture(this.pictureInput)
  }

  handleChange(event) {

    
    console.log(event.target.value)
  }
  render() {
    // variable declaration
    const user = this.props;
    // console.log('account props', {this.props.profliePic)
    return (
      <div>
        <h1>Hello {user.name}</h1>
        <p>Change Picture</p>
        <img src={user.profilePic} />
        {/* Change Profile Picture */}
        <form onSubmit= {this.handleSubmit} >
         <section className="profilePic">
              <span>Add a Profile Picture</span>
              {/* Creating reference to picture file path */}
              <input type="file" name="profilePicture" ref={ (picture)=> {this.pictureInput = picture} }  onChange={this.handleChange} />
         </section>
         <input type="submit" value="Edit Account" />
        </form>
      </div>
    )
  }

}



export default Account;
