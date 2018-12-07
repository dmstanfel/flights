import React, {Component} from 'react';
import {API_URL} from './Const';
import AutoComplete from './AutoComplete';
import axios from 'axios';
import './SearchPage.css';

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.get_id = this.get_id.bind(this);
        this.find_flight = this.find_flight.bind(this);
        this.state = {flights:[], airports:[], from: 0, to: 0}
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
    get_id(from_to, id){
        if (from_to === 0){
            this.setState({from: id});
        }else{
            this.setState({to: id});
        }
    }
    find_flight(){
        let from = this.state.from;
        let to = this.state.to;
        axios({
            method: 'get',
            withCredentials: true,
            url: API_URL + 'flights?filter[departure_id]='+from+'&filter[arrival_id]='+to, 
        }).then((response)=>{
            let data = response.data;
            for(let i = 0; i < data.length; i++){
                axios({
                    method:'get',
                    withCredentials: true,
                    url: API_URL + 'instances?filter[flight_id]='+data[i].id
                }).then((response)=>{
                    console.log(response);
                })
            }
        });
    }
    render(){
       return(<div className='s-contain'>
           <h1 id='s-header'>Search for hundreds of flights at the click of a button.</h1>
           <div className='form-div'> 
                <AutoComplete from_to={0} get_id={this.get_id} data={this.state.airports} name='From ?'/>               
                <AutoComplete from_to={1} get_id={this.get_id} data={this.state.airports} name='To ?'/>  
                <div className='date'>  
                    <input className='s-input dt' type='date' placeholder="Depart" />
                </div>
                <div className='date'>
                    <input className='s-input dt' type='date' placeholder="Return" />
                </div>
                <button onClick={this.find_flight} className='filt-butt' type="submit"value="Submit">Go</button>
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