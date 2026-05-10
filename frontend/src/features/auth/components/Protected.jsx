import React from "react";

import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading....</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default Protected;
