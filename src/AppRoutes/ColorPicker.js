import React, {Component} from 'react';
import { SketchPicker, Circle } from 'react-color';
import PubSub from 'pubsub-js';
import CustomButton from './CustomButton.js';

export default class ColorPicker extends Component {

	constructor(props){
		super(props);
		this.state = {style: {backgroundColor: this.props.color},
						showColorPicker: false};
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps){
		this.setState({style: {backgroundColor: nextProps.color}});
	}

	handleClick(e){
		let p = this.state.showColorPicker;
		this.setState({showColorPicker: !p});
	}

	handleChangeComplete = (color) => {
		let i = this.props.index;
		PubSub.publish("updateColor", {color: color.hex, index: i});
	};

	render(){
		let picker;
		if(this.state.showColorPicker){
			picker = <SketchPicker color={this.state.style.backgroundColor} onChangeComplete={this.handleChangeComplete} />
		}
		return(
			<div className="colorPicker">
				<div className="flexBox">
					<div onClick={this.handleClick} className="colorDisplay" style={this.state.style} />				
					<div className="dragHandle" data-id={this.props.dataId} onDragEnd={this.props.onDragEnd} onDragStart={this.props.onDragStart} draggable='true' />
					<CustomButton className="deleteButton" onClick={this.props.onPublishEvent} label="" />
				</div>
				{picker}
			</div>
		);
	}

}