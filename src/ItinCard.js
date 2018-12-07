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
        <h5> Leaving</h5>
        <p>{this.props.depDate}</p>
        <p>{this.props.depTime}</p>
        <h5> Returning</h5>
        <p>{this.props.arrDate}</p>
        <p>{this.props.arrTime}</p>
      </>
    )
  }
}

export default ItinCard
