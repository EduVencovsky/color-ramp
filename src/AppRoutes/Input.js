import React, {Component} from 'react';

export default class Input extends Component {

	render(){
		return(
			<div>
				<label>{this.props.label}</label>
				<br/>
				<input className="inputField" name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
			</div>
		);
	}

}