import React, {Component} from 'react';
import NavItem from './Nav-Item';
import img from './03.png'; 
import './Nav.css';

class Nav extends Component {
    constructor(props){
        super(props);
        // Contains all of the nav items which will control what is rendered by the app.
        this.handleNavClick = this.handleNavClick.bind(this);
        // The current tab will have the value of current[id] == 1 while all others equal to 0
        // Start off with the search being the current open page.
        this.state = { current: [1,0,0] }
    }

    handleNavClick(e){
        // Navigation click handler, resets the state and as a result re-renders the page
        // if clicked is not the current tab.
        let idClick = parseInt(e.target.id);
        let newState= [0,0,0];
        if (this.state.current[idClick] === 0){
            newState[idClick] = 1;
            this.setState({current : newState});
            this.props.changepage(idClick)
        }
    }

    render(){
        // Render this HTML, necessary with all React components.
        return(
            <div className="nav">
                <div className="nav-item nohov">
                    <img className ='logo' src={img} alt='Dream Flights' />
                </div>
                <NavItem id='0' onClick={this.handleNavClick} name="Search" current={this.state.current[0]}/>
                <NavItem id='1' onClick={this.handleNavClick} name="Wish List" current={this.state.current[1]}/>
                <NavItem id='2' onClick={this.handleNavClick} name="Browse ?" current={this.state.current[2]}/>
               
            </div>
        )
    }
}

export default Nav;