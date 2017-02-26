// importing react and component
import React, {Component} from 'react';

// creating SignIn component
class SignIn extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/* Sign Up Form */}
        <form action="#" method="POST">
          {/* Using refs to grab input values to pass to create user function */}
          <input name="email" ref={(email) => {this.emailInput=email}} type="text" placeholder="email" required />
          <input name="password" ref={(password) => {this.passwordInput=password}} type="text" placeholder="password" required />
          {/*
            Posting user info to firebase
            Passing password, email to createuser function
          */}
          <input type="button" value="Sign In" onClick={()=>{this.props.toggleUserSignIn(this.emailInput.value, this.passwordInput.value); }} />

        </form>
      </div>
    )
  }
}



export default SignIn;
