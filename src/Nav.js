import React, {Component} from 'react';
import NavItem from './Nav-Item';
import './Nav.css'
class Nav extends Component {
    constructor(props){
        super(props);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.state = { current:[1,0,0] }
    }
    handleNavClick(e){
        let idClick = parseInt(e.target.id);
        let newState= [0,0,0];
        if (this.state.current[idClick] === 0){
            newState[idClick] = 1;
            this.setState({current : newState});
        }
    }
    render(){
        return(
            <div className="nav">
                <div className="nav-item nohov">
                    Disco Flights
                </div>
                <NavItem id='0' onClick={this.handleNavClick} name="Search" current={this.state.current[0]}/>
                <NavItem id='1' onClick={this.handleNavClick} name="Itineraries" current={this.state.current[1]}/>
                <NavItem id='2' onClick={this.handleNavClick} name="Browse ?" current={this.state.current[2]}/>
               
            </div>
        )
    }
}

export default Nav;