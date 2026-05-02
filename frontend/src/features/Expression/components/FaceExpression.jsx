import React, { useEffect, useRef, useState } from "react";

import {
  loadModel,
  startWebcam,
  detectExpression,
  drawPoints,
} from "../utils/utils";

function FaceExpression() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Loading model...");

  useEffect(() => {
    let faceLandmarker;

    const init = async () => {
      faceLandmarker = await loadModel();

      await startWebcam(videoRef);

      detect(faceLandmarker);
    };

    const detect = (model) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const processFrame = () => {
        if (video.readyState >= 2) {
          const results = model.detectForVideo(video, Date.now());

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          if (results.faceLandmarks.length > 0) {
            const landmarks = results.faceLandmarks[0];

            drawPoints(ctx, landmarks, canvas.width, canvas.height);

            const mood = detectExpression(landmarks);
            setExpression(mood);
          }
        }

        animationRef.current = requestAnimationFrame(processFrame);
      };

      processFrame();
    };

    init();

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression Detection</h2>

      <video ref={videoRef} style={{ display: "none" }} />

      <canvas ref={canvasRef} width="640" height="480" />

      <h3>{expression}</h3>
    </div>
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
