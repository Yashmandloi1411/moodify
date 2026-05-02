import { RouterProvider } from "react-router-dom";
import { router } from "./routes/app.routes";
import "./features/shared/styles/gloabal.scss";
import { AuthProvider } from "./features/auth/auth.context";
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;

// import React from "react";
// import FaceExpression from "./features/Expression/components/FaceExpression";

// function App() {
//   return <FaceExpression />;
// }

// export default App;
