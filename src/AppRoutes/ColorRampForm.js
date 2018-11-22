import React, {Component} from 'react';
import Input from './Input.js';
import Label from './Label.js';
import ColorInput from './ColorInput.js';
import Gradient from './Gradient.js';
import ColorPicker from './ColorPicker.js';
import CustomButton from './CustomButton.js';
import PubSub from 'pubsub-js';
import ServerRequester from '../ServerRequester.js';
import PubError from '../PubError/PubError.js';

var placeholder = document.createElement("div");
placeholder.className = "colorDisplay";
	
class List extends Component {

	constructor(){
		super();
		this.state = {placeholder: placeholder};
	}

	publishEvent(topic, param, e){
  		PubSub.publish(topic, param);
  	}

	dragEnd(e){
		let dragged = this.dragged;
		let over = this.over;
	    let overParent = over.parentNode.parentNode;
		
		dragged.parentNode.parentNode.style.display = 'block';

	    if(overParent.contains(placeholder)){
	    	placeholder.parentNode.removeChild(placeholder);
	    }

	    var data = this.props.colors;
	    var from = Number(dragged.dataset.id);
	    var to = Number(over.dataset.id);
	    if(from < to) to--;
	    data.splice(to, 0, data.splice(from, 1)[0]);
	    this.publishEvent("updateColorList", data);

	}

	dragStart(e){
		this.dragged = e.currentTarget;
	    e.dataTransfer.effectAllowed = 'move';
	    e.dataTransfer.setData('text/html', this.dragged);
	}

	dragOver(e) {		
		e.preventDefault();
		let elt = e.target;

		if(elt.parentNode.parentNode.className === 'colorPicker'){
			if(elt.className === 'dragHandle'){
    			this.dragged.parentNode.parentNode.style.display = "none";
		    	this.over = elt;
		    	elt.parentNode.parentNode.insertBefore(this.state.placeholder, elt.parentNode);
				
		    }
	    }
  	}

	render(){
		let listItems = this.props.colors.map((color, i) => {
      	return (
      			<div key={i}>
	      			<ColorPicker 
		      			dataId={i}	        	 	
		          		onDragEnd={this.dragEnd.bind(this)}
		          		onDragStart={this.dragStart.bind(this)}
		          		onPublishEvent={this.publishEvent.bind(this,"deleteColor", {index: i})} 
		          		color={color} 
		          		index={i}
	          		/>	
	          	</div>	       			       
      		)
 		});
		return(
			<div className="divp" onDragOver={this.dragOver.bind(this)}>
				{listItems}
			</div>
		);
	}

}

export default class Form extends Component {

	constructor(){
		super();
		this.state = {
					name: "",
					colors: ['white']
				};
		this.handleEvents = this.handleEvents.bind(this);
	}

	componentDidMount(){		
		if(this.props.match.params.id){
			let id = this.props.match.params.id;
			let g = new ServerRequester();
			g.setResquest("getOne", {id: id})
			.then(function(response){
				this.setState({name: response.name, colors: response.colors});
			}.bind(this));
		} 
		PubSub.subscribe("updateColor", function(topic, param){
			let c = this.state.colors;
			c[param.index] = param.color;
			this.setState({colors: c});
		}.bind(this));
		PubSub.subscribe("deleteColor", function(topic, param){
			this.deleteColor({index: param.index});
		}.bind(this));
		PubSub.subscribe("updateColorList", function(topic, param){
			this.setState({colors: param});
		}.bind(this));
	}

	addColor(param){
		let newArray = this.state.colors;
		newArray.push('white');
		this.setState({colors: newArray});
	}
	deleteColor(param){
		let newArray = this.state.colors;
		newArray.splice(param.index, 1);
		this.setState({colors: newArray});
	}
	
	save(param){
		let errors = [];
		let pubError = new PubError();
		pubError.publish("cleanFormError", [""]);

		if(this.state.colors.length < 2){
			errors.push("colors");
		} 
		if(this.state.name.trim() == ""){
			errors.push("name");
		} 
		
		new PubError().publish("formError", errors);

		if(errors.length == 0){
			let s = new ServerRequester();
			let action = "create";
			let p = {data: this.state};
			if(this.props.match.params.id){
				let id = this.props.match.params.id;
				action = "update";
				p = {data: this.state, id: id};
			}
			s.setResquest(action, p)
			.then(function(response){
				this.props.history.push('/');
			}.bind(this));
		}

	}

	handleEvents(action, param, event){
		this[action](param);
	}

	handleChange(e){
		this.setState({name: e.target.value});
	}

	render(){
		return(
			<div>
				<Label label="Nome" name="name" />
				<Input onChange={this.handleChange.bind(this)} value={this.state.name} name="name"/>
				<label>Pré-visualização</label>
				<Gradient colors={this.state.colors}/>				
				<Label label="Cores" name="colors" />
				<table className="hundredp">
					<tbody>
						<tr>
							<td>
								<List colors={this.state.colors} />	
							</td>
						</tr>
						<tr>
							<td>
								<CustomButton onClick={this.handleEvents.bind(this,"addColor", {})} className={"addButton"} label="Adicionar" />
							</td>
						</tr>
					</tbody>
				</table>
				<div className="flexBox">	
					<CustomButton onClick={this.handleEvents.bind(this,"save", {})} className="addButton" label={"Salvar"} />
					<CustomButton onClick={() => this.props.history.push('/')} className="cancelButton" label={"Cancelar"} />
				</div>

			</div>
		);
	}

}