import React, {Component} from 'react';
import './ResultComp.css';
import TixComp from './TixComp';

class ResultComp extends Component{

    constructor(props){
        super(props);
        this.state = { flights: this.props.data, filtAM: 1, filtPM: 1 };
        this.addTickets=this.addTickets.bind(this);
        this.toggleFiltAMPM=this.toggleFiltAMPM.bind(this);

    } 
    addTickets(){
        return this.state.flights.map((item,index) => {
            let am = this.state.filtAM;
            let pm = this.state.filtPM;
            let departTime = new Date(item.departs_at);
            let departHr = departTime.getHours();

            //display flights departing in the AM
            if (am === 1 && pm === 1) {
                return <TixComp key={index} instance = {item.instances} from ={this.props.from} to={this.props.to} 
                airline={item.airline_id} depart = {item.departs_at} arrive = {item.arrives_at} />
            } else if (am === 0 && pm === 1 && departHr > 11) {
                return <TixComp key={index} instance = {item.instances} from ={this.props.from} to={this.props.to} 
                airline={item.airline_id} depart = {item.departs_at} arrive = {item.arrives_at} />
            } else if (am === 1 && pm === 0 && departHr < 12) {
                return <TixComp key={index} instance = {item.instances} from ={this.props.from} to={this.props.to} 
                airline={item.airline_id} depart = {item.departs_at} arrive = {item.arrives_at} />
            }
        })
    }

    toggleFiltAMPM() {
        let pm = this.state.filtPM;
        let am = this.state.filtAM;
        console.log("AM: " + am + " PM: " + pm);
        if (pm === 1 && am === 1) {
            this.setState({filtPM: 0});
        } else if (pm === 0 && am === 1) {
            this.setState({filtPM: 1, filtAM: 0});
        } else if (pm === 1 && am === 0) {
            this.setState({filtAM: 1});
        }
    }

    render(){
        //console.log(this.props.data);
        //this.props.data.items.forEach(function(item) {
        //console.log(item.airline_number)
        return (
            <div className='res-div'>
                <div className='filt-div'>
                    <h2> Filter: </h2>
                    <button onClick={this.toggleFiltAMPM} type="submit" value="Submit"> Toggle Morning/Evening Flights </button>
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