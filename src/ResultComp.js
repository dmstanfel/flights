import React, {Component} from 'react';
import './ResultComp.css';
import FiltComp from './FiltComp';
import TixComp from './TixComp';

class ResultComp extends Component{

    constructor(props){
        super(props);
        //this.state = { flights: this.props.data };
    } 
    addTickets(){
        return this.props.data.map((item,index) => {
            return <TixComp key={index} airline={item.airline_id} depart = {item.departs_at} arrive = {item.arrives_at} />
        })
    }
    render(){
        //console.log(this.props.data);
        //this.props.data.items.forEach(function(item) {
        //console.log(item.airline_number)
        return (
            <div className='res-div'>
                <div className='filt-div'>
                    <h2> Filter By: </h2>
                    <FiltComp />
                    <FiltComp />
                    <FiltComp />
                </div>
                <div className='tix-div'>
                    <h2> Results: </h2>
                    {this.addTickets()}
                </div>
            </div>
        );
    }
}
export default ResultComp;