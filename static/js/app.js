const video = document.getElementById('video');

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => {
      // Displaying Video to User
      video.srcObject = stream;

      // Post Video to Server
      const formData = new FormData();
      formData.append('file', stream);

      // Make the Post Request
      fetch('/detect', {
        method: 'POST',
        body: formData
      }).then(response => {
        console.log(response);
      })
    },
    error => {
      console.log(error);
    }
  );
}

startVideo();

// video.addEventListener('play', e => {
//   const canvas = faceapi.createCanvasFromMedia(video);
//   document.body.append(canvas);
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize);

//   setInterval(async () => {
//     const detections = await faceapi.detectAllFaces(
//       video,
//       new faceapi.TinyFaceDetectorOptions()
//     )
//     .withFaceLandmarks()
//     .withFaceExpressions()
//     .withAgeAndGender();

//     const resizeDetections = faceapi.resizeResults(detections, displaySize);

//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//     faceapi.draw.drawDetections(canvas, resizeDetections);
//     faceapi.draw.drawFaceLandmarks(canvas, resizeDetections);
//     faceapi.draw.drawFaceExpressions(canvas, resizeDetections);
//     resizeDetections.forEach(detection => {
//       const box = detection.detection.box
//       const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
//       drawBox.draw(canvas)
//     })
//   }, 100);
// })
