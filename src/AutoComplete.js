import React, {Component} from 'react';

class AutoComplete extends Component{
    constructor(props){
        super(props);
        this.airportFill = this.airportFill.bind(this);
        this.state = { from: [], value:'' };
    }
    airportFill(e){
        let val = e.target.value;
        let val_upper = val.toUpperCase();
        let airports = this.props.data;
        let filtered = airports.filter((item)=>{
            return (item.city.substr(0, val.length).toUpperCase() === val_upper || 
            item.code.substr(0, val.length).toUpperCase() === val_upper || 
            item.name.substr(0, val.length).toUpperCase() === val_upper);
        });
        this.setState({ val_id: 0, value: e.target.value, from: filtered });
    }

    appendAutoComplete(){
        if (this.state.from.length !== this.props.data.length){
            let auto_div = <div className='auto-items'> 
                {this.state.from.map((item)=>{
                    let city_info = item.code + ' - ' +item.city;
                    return (<div key={item.id} className='auto-item' onClick={()=>{
                            this.props.get_id(this.props.from_to, item.id, item.code);
                            this.setState({ value: city_info, from: []})}}>
                                {city_info}
                                <div className='airp-name'>{item.name}</div>
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