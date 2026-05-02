import React from "react";

import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>loading....</div>;
  }
  if (!user) {
    navigate("/login");
  }
  return children;
}

export default Protected;
