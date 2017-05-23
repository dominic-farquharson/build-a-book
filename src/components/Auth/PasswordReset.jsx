import React from 'react';

// password reset component


class PasswordReset extends React.Component {
    render() {
        return (
            <article className="passwordReset">
            <div className=" uk-position-center">
                <h1>Reset Password</h1>
                {/* Email Input */}
                <input type="text" name="email" placeholder="Enter your email..." ref={(email) =>{this.emailInput=email} } />
                <input 
                    className="createAccountButton uk-button uk-button-default" 
                    type="button" 
                    value="Send Password Reset" 
                    onClick={()=>{
                    {/* Passing references to new password */}
                    props.resetPassword(this.emailInput.value) 
                }} 
            />
            </div>
            {/* Close Button - Render Sign In page */}
            <i className=" backButton fa fa-chevron-circle-left fa-2x" aria-hidden="true" onClick={this.props.backButton}></i>
        </article>
        )
    }
}

export default PasswordReset;