import React, {Component} from 'react';
import './Login.css';

class Login extends Component{
    // This component handles the form and page for login process, handing the 
    // collected username and password from form up to its parent 'Page' via the
    // submit(e) function.

    constructor(props){
        super(props);
        // The values of our input boxes stored in state
        this.state = { user: '', password: '' };
        // Event handler bindings.
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    // Handles changes to the username textbox
    handleUserChange(e){
        this.setState({user: e.target.value});
    }
    // Handles changes to the password textbox
    handlePassChange(e){
        this.setState({password: e.target.value})
    }
    // Handles pressing of submit
    submit(e){
        e.preventDefault();
        let username = this.state.user;
        let password = this.state.password;
        this.props.onSubmit(username, password);
    }

    // Render this HTML please
    render(){
        return(
            <div className='login-page'>
                <div className='login-box'>
                    <h1>Login: </h1>
                    <form className='login-form'onSubmit={this.submit}>
                        <input className='login-input' type='text' placeholder="Username" value={this.state.user} onChange={this.handleUserChange}  />
                        <input className='login-input'type='password' placeholder="Password" value={this.state.password} onChange={this.handlePassChange} />
                        <button className='login-button'type="submit"value="Submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;