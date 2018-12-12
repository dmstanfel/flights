import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class BrowsePage extends Component{

    constructor(props){
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state = { showingInfoWindow: false,
                        activeMarker: {},
                        selectedPlace: {}};
    }
    
    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });
    
    render(){
        let style={width:"100%", height: "calc(94vh)"};
        return(<Map google={this.props.google} style={style} initialCenter={{lat: 39.8283, lng: -98.5795}} zoom={5}>
        {this.props.coords.map((item, index)=>{
            let coo = {lat:item.lat, lng:item.lng}
            return <Marker key={index} onClick={this.onMarkerClick} name={item.name} 
            title={item.name} position={coo} />
        })}
        <InfoWindow 
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
        </InfoWindow>
        </Map>)
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyCPlaS7-Wl4fFY5I9FYxnp9nlKCJsEmi7Y"
  })(BrowsePage)