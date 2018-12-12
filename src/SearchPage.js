import React, {Component} from 'react';
import {API_URL} from './Const';
import AutoComplete from './AutoComplete';
import ResultComp from './ResultComp';
import axios from 'axios';
import './SearchPage.css';

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.get_id = this.get_id.bind(this);
        this.find_flight = this.find_flight.bind(this);
        this.state = { departs:'', flights:[], from: 0, to: 0}
    }

    get_id(from_to, id, code){
        if (from_to === 0){
            this.setState({from: id, from_code: code });
        }else{
            this.setState({to: id, to_code: code });
        }
    }
    find_flight(){
        let from = this.state.from;
        let to = this.state.to;
        this.setState( {flights: []});
        axios({
            method: 'get',
            withCredentials: true,
            url: API_URL + 'flights?filter[departure_id]='+from+'&filter[arrival_id]='+to
        }).then((response)=>{
            let data = response.data;
            for(let i = 0; i < data.length; i++){
                data[i].instances = [];
                if(this.state.departs.length > 0){
                    axios({
                        method:'get',
                        withCredentials: true,
                        url: API_URL + 'instances?filter[flight_id]='+data[i].id + '&filter[date]='+this.state.departs
                    }).then((response)=>{
                        let inst = response.data;
                        data[i].date = this.state.departs;
                        for( let j = 0; j < inst.length; j++){
                            if(inst[j].is_cancelled === false){
                                data[i].instances.push(inst[j].id);
                            }
                        }
                        let flight_arr = this.state.flights;
                        if (data[i].instances.length > 0){
                            flight_arr.push(data[i]);
                            this.setState({ flights: flight_arr  });
                        }
                        
                    })
                }
            }
        });
    }
    results(){
        if (this.state.flights.length > 0){
            return <ResultComp from={this.state.from_code} to={this.state.to_code} data={this.state.flights} date ={this.state.departs} />
        }else{
            return (<div className='res-div'>
                        <h2>Sorry, No Results to Show!</h2>
                    </div>);
        }
    }
    render(){
        //console.log(this.state);
        return(<div className='s-contain'>
           <h1 id='s-header'>Search for hundreds of flights at the click of a button.</h1>
           <div className='form-div'> 
                <AutoComplete from_to={0} get_id={this.get_id} data={this.props.airports} name='From ?'/>               
                <AutoComplete from_to={1} get_id={this.get_id} data={this.props.airports} name='To ?'/> 
                <div className='date'>  
                    <input onChange={(e)=>this.setState({departs:e.target.value})} value={this.state.depart} className='s-input dt' type='date' placeholder="Depart" />
                </div>
                <button onClick={this.find_flight} className='filt-butt' type="submit"value="Submit">Go</button>
           </div>
           {this.results()}
        </div>)
    }
}
export default SearchPage;