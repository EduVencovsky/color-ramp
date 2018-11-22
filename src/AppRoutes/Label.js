import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class Label extends Component {

	constructor(){
		super();
		this.state = {error: ""};
	}

	componentDidMount(){	
		PubSub.subscribe("formError", function(topic, error){
			if(error === this.props.name){
				this.setState({error: "*"});
			}
		}.bind(this));

		PubSub.subscribe("cleanFormError", function(topic, error){
			this.setState({error: ""});
		}.bind(this));
	}

	render(){
		return(
			<div>
				<label>
					{this.props.label}
					<span className="red">{this.state.error}</span>
				</label>
			</div>
		);
	}

}