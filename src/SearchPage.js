import React, {Component} from 'react';
import {API_URL} from './Const';
import AutoComplete from './AutoComplete';
import axios from 'axios';
import './SearchPage.css';

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state = {flights:[], airports:[], from:[], to:[]}
    }
    componentDidMount(){
        axios({
            method: 'get',
            withCredentials: true,
            url: API_URL + 'airports'
        }).then((response) => {
            console.log(response);
            this.setState({airports: response.data});
        }).catch((error) => {
            console.log(error);
        });
    }
    
    render(){
       return(<div className='s-contain'>
           <h1 id='s-header'>Search for hundreds of flights at the click of a button.</h1>
           <div className='form-div'> 
                <AutoComplete data={this.state.airports} name='From ?'/>               
                <AutoComplete data={this.state.airports} name='To ?'/>  
                <div className='date'>  
                    <input className='s-input dt' type='date' placeholder="Depart" />
                </div>
                <div className='date'>
                    <input className='s-input dt' type='date' placeholder="Return" />
                </div>
                <button type="submit"value="Submit">Go</button>
           </div>
           <div className='res-div'>
                <div className='filt-div'>
                </div>
                <div className='tix-div'>
                </div>
           </div>
        </div>)
    }
}
export default SearchPage;