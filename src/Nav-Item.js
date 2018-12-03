import React, {Component} from 'react';
import './Nav.css';

class NavItem extends Component{
    
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