import React, {Component} from 'react';
import axios from 'axios';
import Nav from './Nav';
import {API_URL} from './Const.js';
import Login from './Login'


class Page extends Component{
    // Page handles the login process and the subsequent display of child pages
    // which should be routed using the nav bar.
    constructor(props){
        super(props);
        // Submit button binder
        this.handleSubmit = this.handleSubmit.bind(this);
        // State only cares about state of login at the moment.
        this.state = {loggedIn: this.props.loggedIn};
    }

    // When a user submits there username and password from the child Login component
    // Generate a HTTP POST request using axios
    // Update the state when response comes back.
    handleSubmit(user, password){
        console.log(user);
        console.log(password);
        axios({
            method: 'post',
            withCredentials: true,
            url: API_URL + 'sessions',
            data: {
                user: {
                        username: user,
                        password: password
                }
            }
        }).then((response) =>{
            //console.log(response);
            this.setState({ loggedIn: true });
        }).catch((error)=>{
            console.log(error);
        });

    }

    render(){
        // if we're not logged in render the login page
        if(this.state.loggedIn){
            return(
                <div>
                    <Nav/>
                </div>
            );
        }else{
            // if we are logged in render the main pages.
            return <Login onSubmit={this.handleSubmit}/>;
        }
    }
}
export default Page;