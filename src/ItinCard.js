import React, {Component} from 'react';
import './ItinPage.css';
 class ItinCard extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
   render() {
    return (
      <>
        <h2>{this.props.depAirport} to {this.props.arrAirport}</h2>
        <h3 className="subtitle">{this.props.airline}</h3>
        <p>{this.props.depDate}</p>
        <h5> Departing</h5>
        <p>{this.props.depTime}</p>
        <h5> Arriving</h5>
        <p>{this.props.arrTime}</p>
      </>
    )
  }
}
 export default ItinCard
