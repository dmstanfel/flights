import React, {Component} from 'react';
import axios from 'axios';
import {API_URL} from './Const';
import './ItinPage.css';
import ItinCard from './ItinCard.js'

class ItinPage extends Component{
  constructor(props){
    super(props);
    this.state = {flights:[], airlines:[],
                  airports:[], cumulativeTags: [],
                  removed: [], tickets:[]}
  }

  // Here we just fetch the first 10 flights, but actually we should
  // fetch saved flights. Fetching airlines and airports is still required
  // I believe...
  componentDidMount(){
    axios({
      method: 'get',
      withCredentials: true,
      url: API_URL + 'flights'
    }).then((response) => {
      this.setState({flights: response.data});
    }).catch((error) => {
      console.log(error);
    });
    axios({
      method: 'get',
      withCredentials: true,
      url: API_URL + 'tickets'
    }).then((response) => {
      this.setState({tickets: response.data});
    }).catch((error) => {
      console.log(error);
    });
    axios({
      method: 'get',
      withCredentials: true,
      url: API_URL + 'airlines'
    }).then((response) => {
      this.setState({airlines: response.data});
    }).catch((error) => {
      console.log(error);
    });
    axios({
      method: 'get',
      withCredentials: true,
      url: API_URL + 'airports'
    }).then((response) => {
      this.setState({airports: response.data});
    }).catch((error) => {
      console.log(error);
    });
  }

  findCorrespondingAirline(id) {
    let airline = this.state.airlines.find(function(airlineIndiv) {
      return airlineIndiv.id === id
    })
    return airline.name
  }

  findCorrespondingAirport(id) {
    let airport = this.state.airports.find(function(element) {
      return element.id === id
    })
    return airport.code
  }

  findCorrespondingFlight(id) {
    let flight = this.state.flights.find(function(element) {
      return element.id === id
    })
    return flight
  }

  makeTimeNormalAgain(abnormalTime) {
    let dates = abnormalTime.split('-')
    let rest = dates[2].split('T')
    let times = rest[1].split(':')
    let amPm = "AM"
    let hour = times[0]
    let minute = times[1]

    hour = parseInt(hour)
    if (hour >= 12) {
      amPm = "PM"
    }
    if (hour > 12) {
      hour = hour - 12
    }
    if (hour === 0) {
      hour = 12
    }
    let normalTime = hour + ":" + minute + " " + amPm
    return normalTime
  }

  // Will need to add backend removal of the saved flight as well.
  // This will allow for the card not to be rendered initially, but I think,
  // If the backend is not hooked up, then the card will reappear on page
  // refresh. So if we add backend stuff, it should work properly.
  //
  // Also this is very hacky.
  removeCard = (i) => {
    let id = i.currentTarget.id.split(' ')
    let addTo = parseInt(id[0])
    let newRem = this.state.removed.concat(addTo)
    this.setState({removed: newRem})
    axios({
        method: 'DELETE',
        withCredentials: true,
        url: API_URL + 'tickets/' + id[1]
    })
  }

  renderTenIds(){
    let cumulativeTag = []
    // Poor way to get around this loading issue...
    if (this.state.flights.length === 0
      || this.state.airports.length === 0
      || this.state.airlines.length === 0) {
      return <p> Loading... </p>
    } else {
      let i = 0
      for (i = 0; i < this.state.tickets.length; i++) {
        let flight = this.findCorrespondingFlight(this.state.tickets[i].age)
        let depAirport = this.findCorrespondingAirport(flight.departure_id)
        let arrAirport = this.findCorrespondingAirport(flight.arrival_id)
        let departing = this.makeTimeNormalAgain(flight.departs_at)
        let arriving = this.makeTimeNormalAgain(flight.arrives_at)
        let airline = this.findCorrespondingAirline(flight.airline_id)

        // Delete Button could use more formatting.
        // ItinCard it's own component, could do flipping inside the ItinCard
        // class... More thoughts on that at a later time.
        if (!this.state.removed.includes(i)) {
          cumulativeTag.push(
            <div key={i} className="card-front">
              <ItinCard
              counter={i}
              depAirport={depAirport}
              arrAirport={arrAirport}
              airline={airline}
              depDate={this.state.tickets[i].gender}
              depTime={departing}
              arrTime={arriving}
              flight={flight.plane_id}
              />
              <button id={i + " " + this.state.tickets[i].id} onClick={this.removeCard}> Delete </button>
            </div>
          )
        }
      }
    }
    return cumulativeTag;
  }

  render(){
    let cumulativeTag = this.renderTenIds()
    return(
      <>
        <div className="container">
          {cumulativeTag}
        </div>
      </>)
  }
}
export default ItinPage;
