import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ac from './attendanceCoin';
import web3 from './web3';

class App extends Component {
  constructor() {
    super();

    this.state = {
      account: '',
      balance: 0
    }
  }

  componentDidMount() {
    ac.methods.balanceOf('0xbc148580f43b93aeea5ce7aa8e805bd6db13e8d1').call()
      .then(balance => this.setState({ balance }))
      .catch(err => console.log(err))

    web3.eth.getAccounts()
      .then(response => this.setState({ account: response[0] }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state);
    const address = this.state.account ? this.state.account : `Please log into MetaMask and refresh`;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Your Address: <br/>{address}</h1>
        </header>
        <p className="App-intro">
          Balance: { this.state.balance } AC
        </p>

      </div>
    );
  }
}

export default App;
