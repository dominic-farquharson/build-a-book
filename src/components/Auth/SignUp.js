// importing react and component
import React, {Component} from 'react';

// creating SignUp component
class SignUp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/* Sign Up Form */}
        <form action="#" method="POST">
          {/* Using refs to grab input values to pass to create user function */}

          {/* Display Name */}
          <input name="password" ref={(displayNameInput) => {this.displayNameInput=displayNameInput}} type="text" placeholder="displayNameInput" required />
          <input name="email" ref={(email) => {this.emailInput=email}} type="text" placeholder="email" required />
          <input name="password" ref={(password) => {this.passwordInput=password}} type="text" placeholder="password" required />
          {/*
            Posting user info to firebase
            Passing password, email to createuser function
          */}
          <input type="button" value="Create Account" onClick={()=>{this.props.createUser(this.emailInput.value, this.passwordInput.value, this.displayNameInput.value); }} />
        </form>
      </div>
    )
  }
}



export default SignUp;
