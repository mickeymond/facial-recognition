const path = require('path');
const express = require('express');
const multer = require('multer');
const faceapi = require('face-api.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post('/detect', upload.any('file'), (req, res) => {
  // Load Detection Weights
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromDisk('weights'),
    faceapi.nets.faceLandmark68Net.loadFromDisk('weights'),
    faceapi.nets.faceRecognitionNet.loadFromDisk('weights'),
    faceapi.nets.faceExpressionNet.loadFromDisk('weights'),
    faceapi.nets.ageGenderNet.loadFromDisk('weights'),
  ]).then(success => {
    // If Success, Make Dectections
    console.log(req.file);
    // const detections = await faceapi.detectAllFaces(
    //   video,
    //   new faceapi.TinyFaceDetectorOptions()
    // )
    // .withFaceLandmarks()
    // .withFaceExpressions()
    // .withAgeAndGender();
  }).catch(error => {
    console.log(error);
  });
})

app.listen(3000, () => {
  console.log('Server Running on Port 3000');
});