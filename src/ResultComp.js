import React, {Component} from 'react';
import './ResultComp.css';
import FiltComp from './FiltComp';
import TixComp from './TixComp';

class ResultComp extends Component{

    constructor(props){
        super(props);
        //this.state = { flights: props.data, };
    } 

    render(){
                    console.log("hello world");
                    console.log(this.props.data);
                    //this.props.data.items.forEach(function(item) {
                    //     console.log(item.airline_number);
//});
        return (
            <div className='res-div'>
                <div className='filt-div'>
                    <h2> filt div </h2>
                    <FiltComp />
                    <FiltComp />
                    <FiltComp />
                </div>
                <div className='tix-div'>
                    <h2> tix div </h2>
                    <TixComp />
                    <TixComp />
                    <TixComp />
                </div>
            </div>
        );
    }
}
export default ResultComp;