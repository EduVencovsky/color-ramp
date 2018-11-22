import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="mainContent">
        {this.props.children}
      </div>
    );
  }
}

