import React, {Component} from 'react';
import './Nav.css';

// The little divs that sit on the nav bar
class NavItem extends Component{
    
    // Pretty simple logic if this is the active tab add an extra class "curr"
    // Otherwise only render the normal nav-item class.
    render(){
        let className = 'nav-item';
        if(this.props.current === 1){
            className += ' curr';
        }
        return(
            <div onClick={this.props.onClick} id ={this.props.id} className={className}>
                {this.props.name}
            </div>
        )
    }
}

export default NavItem;