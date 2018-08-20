export const takeSnapshot = () => {
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

export const initWebCam = () => {
  navigator.getUserMedia(
      // Options
      {
        video: {
          width: 300,
          height: 300
        }
      },
      // Success Callback
      function(stream){
          const video = document.querySelector('video');
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
