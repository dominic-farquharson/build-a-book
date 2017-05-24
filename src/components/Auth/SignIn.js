// importing react and component
import React, {Component} from 'react';

// password reset component
import PasswordReset from './PasswordReset.jsx';


// creating SignIn component
class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      resetPassword: false
    }

    // binding
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    //this.props.passwordResetEmail('');
  }

  togglePasswordReset() {
    const reset = this.state.resetPassword;
    if(reset) {
        // rendering sign in page
        return this.setState({resetPassword: false})
    } else {
        // rendering pass reeset component
        return this.setState({resetPassword: true})
    }

    
  }

  handlePress(e) {
    // enter button
    if(e.key == 'Enter') {
      // submitting password
      this.props.toggleUserSignIn(this.emailInput.value, this.passwordInput.value);
    }
  }

  render() {
    const resetPassword = this.state.resetPassword;

    if(!resetPassword) {
      return (
        <div className="signIn">
          {/* Sign Up Form */}
          <form className="uk-position-center" action="#" method="POST">
            <div> {/*className="uk-position-center" */}
              <h1>Sign in to Build A Book</h1>
              {/* Using refs to grab input values to pass to create user function - checking local storage for email - filling input  */} 
              <input 
                className="uk-input" 
                name="email" 
                ref={(email) => {this.emailInput=email}} 
                type="text" 
                placeholder="Email" 
                // getting from local storage
                defaultValue={localStorage.getItem('build-A-Book-Email') || ''  }   
                required 
              />
              <input 
                className="uk-input" 
                name="password" 
                ref={(password) => {this.passwordInput=password}} 
                type="password" 
                placeholder="Password" 
                // Allowing Enter Key to submit form
                onKeyPress={this.handlePress}
                required 
              />
              {/*
                Posting user info to firebase
                Passing password, email to createuser function
              */}
              <input 
                className="signInButton uk-button uk-button-default " 
                type="button" 
                value="Sign In" 
                onClick={()=>{this.props.toggleUserSignIn(this.emailInput.value, this.passwordInput.value); }} 
              />
                {/* Password Reset toggle */}
              <input className="signInButton uk-button uk-button-default " type="button" value="Reset Password" onClick={()=>{this.togglePasswordReset(); }} />              
            </div>

          </form>
          {/* Close/Back Button */}
          <i className=" backButton fa fa-chevron-circle-left fa-2x" aria-hidden="true" onClick={this.props.backButton}></i>
        </div>
      )
   } else {
     return (
       <PasswordReset
          // toggling password reset
          togglePaswordReset={()=>{this.togglePasswordReset()}}
          // back button
          backButton={this.props.backButton}
          resetPassword={(email)=>this.props.passwordResetEmail(email)}
        />
     )
   } 
  }
}



export default SignIn;
