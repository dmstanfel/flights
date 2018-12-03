import React, {Component} from 'react';
import './SearchPage.css';

class SearchPage extends Component{
    render(){
       
       return(<div className='s-contain'>
           <h1 id='s-header'>Search for hundreds of flights at the click of a button.</h1>
           <div className='form-div'>
                <form className='s-form'>
                    <input className='s-input' type='text' placeholder="From?" />
                    <input className='s-input' type='password' placeholder="To?" />
                    <input className='s-input' type='text' placeholder="Depart" />
                    <input className='s-input' type='password' placeholder="Return" />
                    <button type="submit"value="Submit">Submit</button>
                </form>
           </div>
        </div>)
    }
}
export default SearchPage;