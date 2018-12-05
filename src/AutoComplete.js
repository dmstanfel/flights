import React, {Component} from 'react';

class AutoComplete extends Component{
    constructor(props){
        super(props);
        this.airportFill = this.airportFill.bind(this);
        this.state = { from: [], value:'' };
    }
    airportFill(e){
        let value = e.target.value;
        let airports = this.props.data;
        let filtered = airports.filter((item)=>{
            return item.city.includes(value) || item.code === value || item.name.includes(value);
        });
        this.setState({ value: e.target.value, from: filtered });
    }
    pull_val(city_info){
        console.log(city_info);
    }
    appendAutoComplete(){
        if (this.state.from.length !== this.props.data.length){
            let auto_div = <div className='auto-items'> 
                {this.state.from.map((item)=>{
                    let city_info = item.code + '-' +item.city;
                    return (<div key={item.id} className='auto-item' onClick={()=>{this.setState({value: city_info, from: []})}}>
                                {city_info}
                                <input type='hidden' value={city_info}/>
                            </div>)
                })}
            </div>;
            return auto_div;
        }
    }
    render(){
        return (<div className='autocomplete'>
                    <input onChange={this.airportFill} value ={this.state.value} className='s-input' type='text' placeholder={this.props.name} />
                    {this.appendAutoComplete()}
                </div>
        );
    }
}
export default AutoComplete;