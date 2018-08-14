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

    initWebCam();
  }

  takeSnapshot() {

      var hidden_canvas = document.querySelector('canvas'),
          video = document.querySelector('video.camera_stream'),
          image = document.querySelector('img.photo'),

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

      // Set the dataURL as source of an image element, showing the captured photo.
      image.setAttribute('src', imageDataURL); 

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

        <video id='video'>
        </video>

        <button onClick={() => this.takeSnapShot()}>Snap</button>

      </div>
    );
  }
}

export default App;


const initWebCam = () => {
  navigator.getUserMedia(
      // Options
      {
          video: true
      },
      // Success Callback
      function(stream){
          const video = document.getElementById('video');
          // Create an object URL for the video stream and
          // set it as src of our HTLM video element.
          video.src = window.URL.createObjectURL(stream);

          // Play the video element to show the stream to the user.
          video.play();

      },
      // Error Callback
      function(err){

          // Most common errors are PermissionDenied and DevicesNotFound.
          console.error(err);

      }
  );
}

