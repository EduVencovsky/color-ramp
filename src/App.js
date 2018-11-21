import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

export default class App extends Component {

  componentDidMount(){

  }

  render() {
    return (
      <div className="mainContent">
        {this.props.children}
      </div>
    );
  }
}

