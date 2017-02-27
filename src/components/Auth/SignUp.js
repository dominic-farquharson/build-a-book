// importing react and component
import React, {Component} from 'react';

// creating SignUp component
class SignUp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="signUp">
        {/* Sign Up Form */}
        <form className="uk-position-center" action="#" method="POST">
          <div>
            <h1>Create an Account</h1>
            {/* Using refs to grab input values to pass to create user function */}
            {/* Display Name */}
            <input className="uk-input" name="nameInput" ref={(displayNameInput) => {this.displayNameInput=displayNameInput}} type="text" placeholder="Username" required />
            <input className="uk-input" name="email" ref={(email) => {this.emailInput=email}} type="text" placeholder="Email" required />
            <input className="uk-input" name="password" ref={(password) => {this.passwordInput=password}} type="text" placeholder="Password" required />
            {/*
              Posting user info to firebase
              Passing password, email to createuser function
            */}
            <input className="createAccountButton uk-button uk-button-default" type="button" value="Create Account" onClick={()=>{this.props.createUser(this.emailInput.value, this.passwordInput.value, this.displayNameInput.value); }} />
            {/* Close Button */}

          </div>
        </form>
      </div>
    )
  }
}



export default SignUp;
