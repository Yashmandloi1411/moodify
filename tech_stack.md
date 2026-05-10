# Moodify Tech Stack

This document outlines the technologies, frameworks, and libraries used across the entire Moodify application (both Frontend and Backend).

## 🎨 Frontend

The frontend is a single-page application built with modern React, utilizing Vite for fast development and building.

**Core:**
- **[React 19](https://react.dev/)**: JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling and bundler.
- **[React Router v7](https://reactrouter.com/)**: Declarative routing for React applications.

**Machine Learning & Computer Vision:**
- **[MediaPipe Tasks Vision & Face Mesh](https://developers.google.com/mediapipe)**: Used for on-device real-time face detection and expression analysis to determine the user's mood.

**Networking & API:**
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client for making requests to the backend.

**Styling:**
- **[Sass/SCSS](https://sass-lang.com/)**: CSS extension language for more robust and maintainable styling.

**Development Tools:**
- **[ESLint](https://eslint.org/)**: JavaScript linting to ensure code quality.

---

## ⚙️ Backend

The backend is a RESTful API built on Node.js using the Express framework, connecting to a MongoDB database.

**Core:**
- **[Node.js](https://nodejs.org/)**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **[Express 5](https://expressjs.com/)**: Fast, unopinionated, minimalist web framework for Node.js.

**Database & Caching:**
- **[MongoDB & Mongoose](https://mongoosejs.com/)**: NoSQL database and Object Data Modeling (ODM) library.
- **[Redis (ioredis)](https://github.com/redis/ioredis)**: In-memory data structure store, used as a database, cache, and message broker.

**Authentication & Security:**
- **[JSON Web Tokens (JWT)](https://jwt.io/)**: Securely transmitting information between parties as a JSON object.
- **[Bcryptjs](https://www.npmjs.com/package/bcryptjs)**: Password hashing function.
- **[Cookie-Parser](https://www.npmjs.com/package/cookie-parser)**: Middleware for parsing cookies attached to client requests.
- **[CORS](https://www.npmjs.com/package/cors)**: Middleware to enable Cross-Origin Resource Sharing.

**Media & File Management:**
- **[Multer](https://www.npmjs.com/package/multer)**: Middleware for handling `multipart/form-data`, primarily used for uploading files.
- **[ImageKit](https://imagekit.io/)**: Used for image/media storage, optimization, and delivery.
- **[Node-ID3](https://github.com/Zazama/node-id3)**: Used for reading and writing ID3 tags of MP3 files (audio metadata).

**Utilities & Validation:**
- **[Express-Validator](https://express-validator.github.io/docs/)**: Set of express.js middlewares that wraps validator.js validator and sanitizer functions.
- **[Dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from a `.env` file.
- **[Nodemon](https://nodemon.io/)**: Utility that automatically restarts the node application when file changes in the directory are detected.
