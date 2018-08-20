import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ac from './attendanceCoin';
import web3 from './web3';
import { takeSnapshot, initWebCam } from './util.js';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      account: '',
      balance: 0,
      toAddress: '',
      latitude: 0,
      longitude: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendCoin = this.sendCoin.bind(this);
    this.requestAC = this.requestAC.bind(this);
  }
  
  sendCoin() {
    const { account, toAddress, amount } = this.state;
    ac.methods.transfer(toAddress, (amount * Math.pow(10, 18))).send({
      from: account 
    })
      .then((response) => console.log(response))
      .catch(err => console.log(err));
  }

  async componentDidMount() {
    //listen for events
    // transferEvent.watch((err, event) => {
    //   console.log('err', err);
    //   console.log('event', event);
    // });

    const [account] = await web3.eth.getAccounts()
    this.setState({ account })     
    const balance = await ac.methods.balanceOf(this.state.account).call();
    this.setState({ balance })
  }

  startWebCam() {
    initWebCam();
  }

  takeSnapshot() {
    takeSnapshot(); 
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  requestAC() {
    console.log('Processing your request...');

    //get geolocation, promps user to allow program to access location
    navigator.geolocation.getCurrentPosition(position => {

      //gather and send account and location to admin server
      const data = { 
        account: this.state.account, 
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      };
      axios.post('http://localhost:3002/', data)
        .then( response => console.log(response.data) )
        .catch( err => console.log(err));
    })
  }

  render() {
    const address = this.state.account ? this.state.account : `Please log into MetaMask and refresh`;
    const balance = this.state.balance / Math.pow(10, 18);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Your Address: <br/>{address}</h1>
        </header>
        <p className="App-intro">
          Balance: { balance } AC
        </p>
        <button onClick={this.requestAC}>Request AC</button> 
        <hr/>
        <video>
        </video>
        <canvas></canvas>
        <img id="snapshot" />


        <button onClick={() => this.takeSnapshot()}>Snap</button>
        <button onClick={() => this.startWebCam()}>Start Cam</button>

        <br/>
        <hr/>

        <h3>Send AC</h3>
         
        <label>Address: </label>
        <input value={this.state.sendAddress} onChange={this.handleChange} type="text" name="toAddress" placeholder="0xbc148580f43b93aeea5ce7aa8e805bd6db13e8d1" size="50"/>
        
        <br/>
        <br/>
        <label>Amount: </label>
        <input value={this.state.sendAddress} onChange={this.handleChange} type="text" name="amount" placeholder="30" />
        <br/>
        <br/>
        <button onClick={this.sendCoin}>Send</button>
      </div>
    );
  }
}

export default App;




