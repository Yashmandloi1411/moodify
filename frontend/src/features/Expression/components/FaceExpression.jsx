import React, { useEffect, useRef, useState } from "react";

import {
  loadModel,
  startWebcam,
  detectExpression,
  drawPoints,
} from "../utils/utils";
import "./FaceExpression.scss";

function normalizeMood(value) {
  if (!value) return "happy";
  const mood = value.toLowerCase();
  if (
    mood.includes("happy") ||
    mood.includes("smile") ||
    mood.includes("joy")
  ) {
    return "happy";
  }
  if (mood.includes("sad")) {
    return "sad";
  }
  if (
    mood.includes("angry") ||
    mood.includes("mad") ||
    mood.includes("annoyed")
  ) {
    return "angry";
  }
  if (mood.includes("surpris")) {
    return "surprised";
  }
  return "neutral";
}

function FaceExpression({ onMoodDetected }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const animationRef = useRef(null);

  const [status, setStatus] = useState("Loading model...");
  const [expression, setExpression] = useState("Press Detect Mood to start");
  const [detectedMood, setDetectedMood] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const model = await loadModel();
        modelRef.current = model;
        await startWebcam(videoRef);
        setStatus(
          "Camera ready. Click Detect Mood when your face is centered.",
        );

        const drawFrame = () => {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (video && canvas && video.readyState >= 2) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const results = model.detectForVideo(video, Date.now());
            if (results && results.faceLandmarks.length > 0) {
              const landmarks = results.faceLandmarks[0];
              drawPoints(ctx, landmarks, canvas.width, canvas.height);
            }
          }
          animationRef.current = requestAnimationFrame(drawFrame);
        };

        animationRef.current = requestAnimationFrame(drawFrame);
      } catch (error) {
        console.error(error);
        setStatus("Unable to access camera. Please allow webcam access.");
      }
    };

    init();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleDetectMood = () => {
    const model = modelRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!model || !video || !canvas) {
      setStatus("Model is still loading. Please wait a moment.");
      return;
    }

    if (video.readyState < 2) {
      setStatus("Camera not ready yet. Please try again.");
      return;
    }

    const results = model.detectForVideo(video, Date.now());

    if (!results || results.faceLandmarks.length === 0) {
      setStatus(
        "No face detected. Please center your face and click Detect again.",
      );
      return;
    }

    const landmarks = results.faceLandmarks[0];

    const mood = detectExpression(landmarks);
    const normalized = normalizeMood(mood);

    setExpression(mood);
    setDetectedMood(normalized);
    setStatus("Mood detected successfully.");
    onMoodDetected?.(normalized);
  };

  return (
    <section className="face-expression">
      <video
        ref={videoRef}
        className="face-expression__video"
        autoPlay
        muted
        playsInline
      />

      <div className="face-expression__header">
        <div>
          <h2>Face Expression</h2>
          <p className="face-expression__status">{status}</p>
        </div>
        <span className="face-expression__badge">Click to detect</span>
      </div>

      <div className="face-expression__canvas-wrapper">
        <canvas ref={canvasRef} width="640" height="480" />
      </div>

      <div className="face-expression__footer">
        <div className="face-expression__result">
          <h3>{expression}</h3>
          {detectedMood && <p>Detected mood: {detectedMood}</p>}
        </div>

        <button
          type="button"
          className="face-expression__button"
          onClick={handleDetectMood}
        >
          Detect Mood
        </button>
      </div>
    </section>
  );
}

export default FaceExpression;
// import React, { useEffect, useRef, useState } from "react";
// import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// function FaceExpression() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [expression, setExpression] = useState("Loading model...");

//   let faceLandmarker;

//   const init = async () => {
//     const vision = await FilesetResolver.forVisionTasks(
//       "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
//     );

//     faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
//       baseOptions: {
//         modelAssetPath:
//           "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
//       },
//       runningMode: "VIDEO",
//       numFaces: 1,
//     });

//     startCamera();
//   };

//   const startCamera = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//     });
//     videoRef.current.srcObject = stream;
//     videoRef.current.play();

//     detect();
//   };
//   const detect = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const processFrame = () => {
//       if (video.readyState >= 2) {
//         const results = faceLandmarker.detectForVideo(video, Date.now());

//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         if (results.faceLandmarks.length > 0) {
//           const landmarks = results.faceLandmarks[0];

//           drawPoints(ctx, landmarks, canvas.width, canvas.height);
//           detectExpression(landmarks);
//         }
//       }

//       animationFrameId = requestAnimationFrame(processFrame);
//     };

//     processFrame();
//   };
//   const detectExpression = (landmarks) => {
//     const upperLip = landmarks[13];
//     const lowerLip = landmarks[14];
//     const leftEyeTop = landmarks[159];
//     const leftEyeBottom = landmarks[145];

//     const lipDistance = Math.abs(upperLip.y - lowerLip.y);
//     const eyeOpen = Math.abs(leftEyeTop.y - leftEyeBottom.y);

//     if (lipDistance > 0.03) {
//       setExpression("😊 Smiling");
//     } else if (eyeOpen > 0.03) {
//       setExpression("😲 Surprised");
//     } else {
//       setExpression("😐 Neutral");
//     }
//   };

//   const drawPoints = (ctx, landmarks, width, height) => {
//     ctx.fillStyle = "lime";

//     landmarks.forEach((point) => {
//       const x = point.x * width;
//       const y = point.y * height;

//       ctx.beginPath();
//       ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
//       ctx.fill();
//     });
//   };
//   useEffect(() => {
//     let animationFrameId;
//     init();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>Face Expression Detection (Tasks Vision)</h2>

//       <video
//         ref={videoRef}
//         style={{ display: "none" }}
//         width="640"
//         height="480"
//       />

//       <canvas
//         ref={canvasRef}
//         width="640"
//         height="480"
//         style={{ borderRadius: "10px" }}
//       />

//       <h3>{expression}</h3>
//     </div>
//   );
// }

// export default FaceExpression;
