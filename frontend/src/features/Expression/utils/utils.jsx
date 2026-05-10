import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const loadModel = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
  );

  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    runningMode: "VIDEO",
    numFaces: 1,
  });

  return faceLandmarker;
};

export const startWebcam = async (videoRef) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoRef.current.srcObject = stream;
  await videoRef.current.play();
};

export const detectExpression = (landmarks) => {
  const upperLip = landmarks[13];
  const lowerLip = landmarks[14];
  const leftEyeTop = landmarks[159];
  const leftEyeBottom = landmarks[145];

  const lipDistance = Math.abs(upperLip.y - lowerLip.y);
  const eyeOpen = Math.abs(leftEyeTop.y - leftEyeBottom.y);

  if (lipDistance > 0.03) return "Happy";
  if (eyeOpen > 0.03) return "Surprised";

  return "sad";
};

export const drawPoints = (ctx, landmarks, width, height) => {
  ctx.fillStyle = "lime";

  landmarks.forEach((point) => {
    const x = point.x * width;
    const y = point.y * height;

    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
    ctx.fill();
  });
};
