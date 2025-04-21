import './index.css';
import Webcam from "react-webcam";
import React, { useRef, useState } from "react";

const PhotoButton = () => {
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Open the camera
  const openCamera = () => {
    setShowCamera(true);
    setImageSrc(null);
    setUploadSuccess(false);
  };

  // Capture the photo
  const capturePhoto = () => {
    const image = webcamRef.current.getScreenshot(); // base64 image
    setImageSrc(image);
    setShowCamera(false);
    setUploadSuccess(false);
  };

  // Upload the photo to backend
  const uploadPhoto = async () => {
    if (!imageSrc) return;

    setUploading(true);

    try {
      const blob = await fetch(imageSrc).then(res => res.blob());
      const formData = new FormData();
      formData.append("image", blob, `photo-${Date.now()}.jpg`);
      formData.append("barcode", "123456789"); // Placeholder barcode

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload success:", data);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Take a Photo</h2>

      {/* Show camera button if not showing camera or photo */}
      {!showCamera && !imageSrc && (
        <button onClick={openCamera} style={{ marginBottom: "10px" }}>
          Open Camera
        </button>
      )}

      {/* Show live camera preview */}
      {showCamera && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: "100%", maxWidth: "400px" }}
            // Uncomment for back camera on phones:
            // videoConstraints={{ facingMode: { exact: "environment" } }}
          />
          <button onClick={capturePhoto} style={{ marginTop: "10px" }}>
            Take Photo
          </button>
        </div>
      )}

      {/* Show captured image and upload buttons */}
      {imageSrc && (
        <div style={{ marginTop: "20px" }}>
          <h3>Captured Photo:</h3>
          <img
            src={imageSrc}
            alt="Captured"
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setImageSrc(null)}>Retake Photo</button>
            <button
              onClick={uploadPhoto}
              disabled={uploading}
              style={{ marginLeft: "10px" }}
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
          {uploadSuccess && (
            <p style={{ color: "green", marginTop: "10px" }}>
              Upload successful!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoButton;
