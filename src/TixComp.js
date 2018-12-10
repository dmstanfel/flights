import React, {Component} from 'react';
import {API_URL} from './Const';
import axios from 'axios';
import './TixComp.css';

class TixComp extends Component{

    constructor(props){
        super(props);
        this.state = {airline: ''};
        console.log(this.props.airline);
    }
    componentDidMount(){
        axios({
            method:'get',
            withCredentials: true,
            url: API_URL + 'airlines/' + this.props.airline
        }).then((response)=>{
            let airline_name = response.data.name;
            console.log(airline_name);
            this.setState({airline: airline_name});
        }).catch((error)=>{
            console.log(error);
        })
    }
    formatMins(mins){
        if (mins < 10){
            return '0' + mins.toLocaleString();
        }else{
            return mins.toLocaleString();
        }
    }
    edit_date(date){
        let new_date = new Date(date);
        let print_date = '';
        let hrs = new_date.getHours()
        let mins = this.formatMins(new_date.getMinutes());
        if (hrs > 12){
            hrs -= 12;
            let hrs_string = hrs.toLocaleString();
            print_date = hrs_string + ':' + mins + ' PM';
        }else if (hrs === 0){
            hrs = 12;
            let hrs_string = hrs.toLocaleString();
            print_date = hrs_string + ':' + mins + ' AM';
        }else{
            let hrs_string = hrs.toLocaleString();
            print_date = hrs_string + ':' + mins + ' AM';
        }
        return print_date;
    }
    render(){
        console.log(this.state);
        return (
            <div className="ticket">
                <div className='tix-left'> 
                    <div className = 'l-cont'>
                        <div className='time-air'>
                            <p>{this.edit_date(this.props.depart)} - {this.edit_date(this.props.arrive)}</p>
                            <p>{this.state.airline}</p>
                        </div>
                        <div className='tix-type'>
                            <p>nonstop</p>
                        </div>
                        <div className='tix-length'>
                            <p>2h 30m</p>
                            <p>RDU-LGA</p>
                        </div>
                    </div>
                </div>
                <div className='tix-right'>
                </div>
            </div>
        );
    }
}
export default TixComp;