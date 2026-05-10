import { RouterProvider } from "react-router-dom";
import { router } from "./routes/app.routes";
import "./features/shared/styles/gloabal.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/Home/song.context";
function App() {
  return (
    <>
      <AuthProvider>
        <SongContextProvider>
          <RouterProvider router={router} />
        </SongContextProvider>
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
