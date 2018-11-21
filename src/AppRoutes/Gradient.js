import React, { Component } from 'react';

export default class Gradient extends Component {

	constructor(props){
		super(props);
		let gradient = "linear-gradient(to right, " + this.props.colors.join(", ") + " )";		
		let background = {backgroundImage: gradient};
		this.state = {style: background};
	}

	componentWillReceiveProps(newProps){
		console.log("reciveprops", newProps);
		let gradient, background;
		if(newProps.colors.length > 1){
			gradient = "linear-gradient(to right, " + newProps.colors.join(", ") + " )";		
			background = {backgroundImage: gradient};	
		}
		this.setState({style: background});
	}

	render(){
		console.log("renderGradient", this.state.style);
		return(
			<div style={this.state.style} className="colorDisplay">
			</div>
		);
	}

}