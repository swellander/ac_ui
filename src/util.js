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
