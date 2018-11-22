import React, {Component} from 'react';

export default class Input extends Component {

	render(){
		return(
			<div>
				<input className="inputField" name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
			</div>
		);
	}

}