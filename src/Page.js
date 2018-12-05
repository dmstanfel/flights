import React, {Component} from 'react';
import axios from 'axios';
import Nav from './Nav';
import {API_URL} from './Const.js';
import Login from './Login';
import SearchPage from './SearchPage';
import ItinPage from './ItinPage';
import BrowsePage from './BrowsePage';

class Page extends Component{
    // Page handles the login process and the subsequent display of child pages
    // which should be routed using the nav bar.
    constructor(props){
        super(props);
        // Submit button binder
        this.handleSubmit = this.handleSubmit.bind(this);
        this.page_change = this.page_change.bind(this);
        // State only cares about state of login at the moment.
        this.state = {loggedIn: this.props.loggedIn, current:0};
    }

    // When a user submits there username and password from the child Login component
    // Generate a HTTP POST request using axios
    // Update the state when response comes back.
    handleSubmit(user, password){
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
    page_change(page){
        this.setState({current: page});
    }
    choose_page(){
        let page;
        if (this.state.current === 0){
            page = <SearchPage />
        }else if (this.state.current === 1){
            page = <ItinPage />
        }else{
            page = <BrowsePage />
        }
        return page;
    }
    render(){
        // if we're not logged in render the login page
        let page = this.choose_page();
        if(this.state.loggedIn){
            return(
                <div>
                    <Nav changepage={this.page_change}/>
                    {page}
                </div>
            );
        }else{
            // if we are logged in render the main pages.
            return <Login onSubmit={this.handleSubmit}/>;
        }
    }
}
export default Page;