import React, {Component} from 'react';
import './Login.css';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = { user: '', password: '' };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleUserChange(e){
        this.setState({user: e.target.value});
    }
    handlePassChange(e){
        this.setState({password: e.target.value})
    }
    submit(e){
        e.preventDefault();
        let username = this.state.user;
        let password = this.state.password;
        this.props.onSubmit(username, password);
    }
    render(){
        return(
            <div className='login-page'>
                <div className='login-box'>
                    <h1>Login: </h1>
                    <form onSubmit={this.submit}>
                        <input type='text' placeholder="Username" value={this.state.user} onChange={this.handleUserChange}  />
                        <input type='password' placeholder="Password" value={this.state.password} onChange={this.handlePassChange} />
                        <button type="submit"value="Submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;