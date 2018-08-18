import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ac from './attendanceCoin';
import web3 from './web3';
import { initWebCam } from './util.js';
import Button from 'antd/lib/button';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      account: '',
      balance: 0,
      toAddress: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendCoin = this.sendCoin.bind(this);
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
    
    const [account] = await web3.eth.getAccounts()
    this.setState({ account })     

    const balance = await ac.methods.balanceOf(this.state.account).call();
    this.setState({ balance })
      // .then(balance => {
      //   console.log('hey')
      //   this.setState({ balance })
      // })
      // .catch(err => console.log('ERROR', err))

    

  }

  startWebCam() {
    initWebCam();
    console.log('webCam init')
  }

  takeSnapshot() {

      var hidden_canvas = document.querySelector('canvas'),
          video = document.querySelector('video'),
          image = document.querySelector('#snapshot'),

          // Get the exact size of the video element.
          width = video.videoWidth,
          height = video.videoHeight,

          // Context object for working with the canvas.
          context = hidden_canvas.getContext('2d');

      // Set the canvas to the same dimensions as the video.
      hidden_canvas.width = width;
      hidden_canvas.height = height;

      // Draw a copy of the current frame from the video on the canvas.
      context.drawImage(video, 0, 0, width, height);

      // Get an image dataURL from the canvas.
      var imageDataURL = hidden_canvas.toDataURL('image/png');

      //clear canvas
      context.clearRect(0,0, width, height);

      // Set the dataURL as source of an image element, showing the captured photo.
      image.setAttribute('src', imageDataURL); 

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
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
        

        <video>
        </video>
        <canvas></canvas>
        <img id="snapshot" />


        <Button onClick={() => this.takeSnapshot()}>Snap</Button>
        <Button onClick={() => this.startWebCam()}>Start Cam</Button>

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
        <Button onClick={this.sendCoin}>Send</Button>
      </div>
    );
  }
}

export default App;




