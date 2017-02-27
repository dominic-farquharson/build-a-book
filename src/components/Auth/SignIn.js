// importing react and component
import React, {Component} from 'react';

// creating SignIn component
class SignIn extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="signIn">
        {/* Sign Up Form */}
        <form className="uk-position-center" action="#" method="POST">
          <div> {/*className="uk-position-center" */}
            <h1>Sign in to Build A Book</h1>
            {/* Using refs to grab input values to pass to create user function */}
            <input className="uk-input" name="email" ref={(email) => {this.emailInput=email}} type="text" placeholder="Email" required />
            <input className="uk-input" name="password" ref={(password) => {this.passwordInput=password}} type="text" placeholder="Password" required />
            {/*
              Posting user info to firebase
              Passing password, email to createuser function
            */}
            <input className="signInButton uk-button uk-button-default " type="button" value="Sign In" onClick={()=>{this.props.toggleUserSignIn(this.emailInput.value, this.passwordInput.value); }} />
          </div>

        </form>
      </div>
    )
  }
}



export default SignIn;
