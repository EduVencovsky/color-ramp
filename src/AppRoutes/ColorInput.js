import React, {Component} from 'react';
import { Github } from 'react-color';

export default class ColorPicker extends Component {

	constructor(){
		super();
		this.state = {
			background: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.onSwatchHover = this.onSwatchHover.bind(this);
	}

	handleChange(e){
		console.log(e)
	}

	onSwatchHover(e){
		console.log(e);
	}

	render(){
		return(
			<div>
				<Github onSwatchHover={this.onSwatchHover} onChange={this.handleChange}/>
			</div>
		);
	}

}