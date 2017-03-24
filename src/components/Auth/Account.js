// importing react and component
import React, {Component} from 'react';

// creating Account component
class Account extends Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      edit:false
    }
    // binding function
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  // Making React control state of form
  handleSubmit(event) {
    console.log('submitted changes', event)
    event.preventDefault();

    // from input fields
    const name = this.nameInput.value;
    const picture = this.pictureInput.files[0];
    
    // User doesn't upload a new picture, but changes name
    if(picture===undefined) {
        console.log('name has been changed');
        this.props.updateName(name);
        this.toggleAccountEdit()  
      return;
    }
    // User uploads a new picture and changes name
    else {
      // user only changed picture
      if(name === this.props.name) {
        this.props.updatePicture(this.pictureInput);
        this.toggleAccountEdit()  
        return;
      }
      // user changed picture and name
      console.log('picture and name has been changed');
      // // updating picture and profile name
      this.props.updatePicture(this.pictureInput);
      this.props.updateName(name);
      // closing editor    
      this.toggleAccountEdit()  
      return;
    }
    
  }

  handleChange(event) {

    
    console.log(event.target.value)
  }
  // toggling edit 
  toggleAccountEdit() {
    const edit = this.state.edit;
    if(edit) {
      this.setState({edit: false})
    }
    else {
      this.setState({edit: true})
    }
  }
  render() {
    // variable declaration
    const user = this.props;
    const account = this.state;
    // console.log('account props', {this.props.profliePic)

    // Rendering Account Page with user info
    if(!account.edit) {
      return (
        <div className="account">
          <h1>Hello {user.name}</h1>
          <img src={user.profilePic} /> 
          <br />
          <input type="button" value="Edit" onClick={()=> this.toggleAccountEdit()} />       
        </div>
      )
   }
  
  // rendering edit fields 
  else {
    return(
       <div className="account">                 
          {/* Change Profile Picture */}
         <form onSubmit= {this.handleSubmit} >
           <section>
              <h1>Edit Account</h1>
              <label>Name:<input type="text" defaultValue={user.name} name="name" ref={ (name)=> {this.nameInput = name} } required /></label>
              <br />
              <img src={user.profilePic} />
            </section>             
            <section className="profilePic">
                  <span>Change Profile Picture</span>
                  <br />
                  {/* Creating reference to picture file path */}
                  <input type="file" name="profilePicture" ref={ (picture)=> {this.pictureInput = picture} }  onChange={this.handleChange} />
            </section>
            <input type="submit" value="Edit" />
            <input type="button" value="Cancel" onClick={()=>this.toggleAccountEdit()} />
          
        </form>
        </div>
    )
  }

  }

}



export default Account;
