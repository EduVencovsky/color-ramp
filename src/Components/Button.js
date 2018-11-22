import React, {Component} from 'react';

export default class CustomButton extends Component {

	render(){
		return(
			<div>
				<button className={this.props.className} onClick={this.props.onClick} >{this.props.label}</button>
			</div>
		);
	}

}