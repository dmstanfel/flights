import React, {Component} from 'react';
import axios from 'axios';
import Nav from './Nav';
import {API_URL} from './Const.js';
import Login from './Login'


class Page extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {loggedIn: this.props.loggedIn};
    }
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
        if(this.state.loggedIn){
            return(
                <div>
                    <Nav/>
                </div>
            );
        }else{
            return <Login onSubmit={this.handleSubmit}/>;
        }
    }
}
export default Page;