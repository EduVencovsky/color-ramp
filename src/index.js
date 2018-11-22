import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './App';
import ColorRampForm from './AppRoutes/ColorRampForm.js';
import ColorRampList from './AppRoutes/ColorRampList.js';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';


ReactDOM.render(
	(<Router>
		<App>		
			<Switch>
				<Route exact path="/" component={ColorRampList}/>
				<Route exact path="/new" component={ColorRampForm}/>
				<Route exact path="/new/:id" component={ColorRampForm}/>
			</Switch>		
		</App>
	</Router>
	), 
	document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
