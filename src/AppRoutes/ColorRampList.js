import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import ServerRequester from '../ServerRequester.js';
import Gradient from "./Gradient.js";
import CustomButton from "./CustomButton.js";

export default class ColorRampList extends Component {

	constructor(){
		super();
		this.state = {colorList: []};
		this.handleButtonClick = this.handleButtonClick.bind(this);		
		this.loadColorList = this.loadColorList.bind(this);
	}

	componentDidMount(){
		this.loadColorList();
	}

	loadColorList(){
		let request = new ServerRequester();
		request.setResquest("getAll", {})
		.then(function(e){
			this.setState({colorList: e});
		}.bind(this));
	}

	handleButtonClick(action, id, event){
		let request = new ServerRequester();
		request.setResquest(action, {id: id})
		.then(function(e){
			this.loadColorList();
		}.bind(this));
	}

	render(){
		return(
			<div>
				<h2 className="left">Rampas de Cores</h2>
				<CustomButton className="addButton right" onClick={() => this.props.history.push('/new')} label="Adicionar"/>
				<table className="colorTable hundredp">
					<tbody>
						<tr>
							<th className="nameCell">Nome</th>
							<th className="previewCell">Pré-visualização</th>
							<th className="buttonCell">     </th>
							<th className="buttonCell">     </th>
						</tr>
						{
							this.state.colorList.map(function(colors){							
								return (
										<tr key={colors.id}>
											<td className="nameCell">
												{colors.name}
											</td>
											<td className="previewCell">										
												<Gradient colors={colors.colors}/>
											</td>
											<td className="buttonCell">
												<CustomButton className="editButton" onClick={() => this.props.history.push('/new/' + colors.id)}/>
											</td>
											<td className="buttonCell">
												<CustomButton className="deleteButton" onClick={this.handleButtonClick.bind(this,"destroy", colors.id)}/>
											</td>
										</tr>
									);
							}.bind(this))
						}
					</tbody>
				</table>					
			</div>
		);
	}

}