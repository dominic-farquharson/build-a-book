// landing page for app

// importing react and component
import React, {Component} from 'react';

// importing sign in component
import SignIn from './SignIn';
// importing sign up component
import SignUp from './SignUp';

// creating Welcome component
class Welcome extends Component {
  constructor(props) {
    super(props);
    // setting signin and singUp inital state to fasle
    this.state = {
      signIn : false,
      signUp : false,
      welcome: true
    }

    // binding functions - but unecessary since using fat arrow
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);

  }

  // toggles sign in state - renders sign in component
  toggleSignIn() {
    if(this.state.signIn)
      this.setState({signIn: false})
    else {
      // setting state of sign in to true - renders sign in component
      this.setState({signIn : true})
      // setting state of welcome to false
      this.setState({welcome: false})
    }
  }

  // toggles sign up state - renders sign up component
  toggleSignUp() {
    if(this.state.signUp)
      this.setState({signUp: false})
    else {
      // setting state of welcome to false
      this.setState({welcome: false})
      // setting state of sign up to true
      this.setState({signUp : true})

    }
  }

  render() {
    // let userSignedIn = this.state.signIn;

    // variable containing welcome state
    let welcomeScreen = this.state.welcome;
    // variable containing sign up state
    let userSignUp = this.state.signUp;

    // variable containing sign in state - toggles sign in component
    let userSignIn = this.state.signIn;


      // user not signed in - loads welcome screen
      if(welcomeScreen) {
      return (
        <header id="welcomeScreen">
          <nav>
            <ul>
              <li
                onClick ={
                  ()=>{this.toggleSignIn(); console.log('Sign in Pressed')}
              }>
                Sign In
              </li>
              <li
                onClick ={
                  ()=>{this.toggleSignUp(); console.log('Sign Up Pressed')}
              }>
                Sign Up
              </li>
            </ul>
          </nav>
        </header>

    )
  }

  // user signing up - toggles sign up component - if usersignup is false
  if(userSignUp) {
    return(
      // Sign up component
      <div>
        <SignUp
          // passing create user function as prop for use in Sign Up component
          createUser = {(email, password, displayName)=>this.props.createUser(email, password, displayName)}
          // createUser = {(email, password)=>this.props.createUser(email, password)}

         />
      </div>
    )
  }

  // user clicks sign in button - toggles  rendering of sign in component
  if(userSignIn) {
    return (
      <div>
        <SignIn
          toggleUserSignIn = { (email, password)=>this.props.toggleUserSignIn(email, password)}
        />

      </div>
    )
  }

  }
}



export default Welcome;