
import './index.css';
import Webcam from"react-webcam";
import React, { useRef, useState } from "react";


const PhotoButton = () => {
    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

  // Show the camera
  const openCamera = () => {
    setShowCamera(true);
    setImageSrc(null); // Reset photo when opening camera again
  };

  // Capture the photo
  const capturePhoto = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
    setShowCamera(false); // Hide camera after capturing
  };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Take a Photo</h2>
    
          {/* Show "Open Camera" Button if Camera is Hidden */}
          {!showCamera && !imageSrc && (
            <button onClick={openCamera} style={{ marginBottom: "10px" }}>
              Open Camera
            </button>
          )}
    
          {/* Show Webcam if Camera is Open */}
          {showCamera && (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: "100%", maxWidth: "400px" }}
                
              />
              <button onClick={capturePhoto} style={{ marginTop: "10px" }}>
                Take Photo
              </button>
            </div>
          )}
    
          {/* Show Captured Photo */}
          {imageSrc && (
            <div style={{ marginTop: "20px" }}>
              <h3>Captured Photo:</h3>
              <img
                src={imageSrc}
                alt="Captured"
                style={{ width: "100%", maxWidth: "400px" }}
              />
              <button onClick={() => setImageSrc(null)} style={{ marginTop: "10px" }}>
                Retake Photo
              </button>
            </div>
          )}
        </div>
      );


};

export default PhotoButton;
