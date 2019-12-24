const video = document.getElementById('video');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('https://github.com/mickeymond/facial-recognition/blob/master/weights'),
  faceapi.nets.faceLandmark68Net.loadFromUri('https://github.com/mickeymond/facial-recognition/blob/master/weights'),
  faceapi.nets.faceRecognitionNet.loadFromUri('https://github.com/mickeymond/facial-recognition/blob/master/weights'),
  faceapi.nets.faceExpressionNet.loadFromUri('https://github.com/mickeymond/facial-recognition/blob/master/weights'),
  faceapi.nets.ageGenderNet.loadFromUri('https://github.com/mickeymond/facial-recognition/blob/master/weights'),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    console.log
  );
}

video.addEventListener('play', e => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    )
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender();

    const resizeDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizeDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizeDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizeDetections);
    resizeDetections.forEach(detection => {
      const box = detection.detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
      drawBox.draw(canvas)
    })
  }, 100);
})
