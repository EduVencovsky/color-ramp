import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class Input extends Component {

	constructor(){
		super();
	}

	render(){
		return(
			<div>
				<input className="inputField" name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
			</div>
		);
	}

}