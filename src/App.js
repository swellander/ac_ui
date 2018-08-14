import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ac from './attendanceCoin';
import web3 from './web3';

class App extends Component {

  componentDidMount() {
    ac.methods.balanceOf('0xbc148580f43b93aeea5ce7aa8e805bd6db13e8d1').call()
      .then(response => console.log(response))
      .catch(err => console.log(err))

    web3.eth.getAccounts()
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
