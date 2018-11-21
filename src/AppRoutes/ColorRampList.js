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
				<div className="flexBox">
					<h4>Rampa de Cores</h4>
					<CustomButton className={"addButton"} onClick={() => this.props.history.push('/new')} label="Adicionar"/>
				</div>
				<table className="colorTable">
					<tbody>
						<tr>
							<th>Nome</th>
							<th>Pré-visualização</th>
							<th>     </th>
							<th>     </th>
						</tr>
						{
							this.state.colorList.map(function(colors){							
								return (
										<tr key={colors.id}>
											<td className="nameCell">
												{colors.name}
											</td>
											<td>										
												<Gradient colors={colors.colors}/>
											</td>
											<td>
												<CustomButton label="Edit" onClick={() => this.props.history.push('/new/' + colors.id)}/>
											</td>
											<td>
												<CustomButton label="Delete" onClick={this.handleButtonClick.bind(this,"destroy", colors.id)}/>
											</td>
										</tr>
									);
							}.bind(this))
						}
					</tbody>
				</table>
				
					
				<div>
					
				</div>
			</div>
		);
	}

}