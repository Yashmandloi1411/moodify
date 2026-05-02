import React, { useState } from "react";

import "../styles/Login.scss";

import FormGroup from "../components/FormGroup";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const handleSubmit = (e) => {
  e.preventDefault();
};

function Login() {
  const navigate = useNavigate();
  const { handleLogin, loading, user, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({
      email: email,
      password: password,
    });
    navigate("/");
  };
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Email"
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormGroup
            label="Password"
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </main>
  );
}

export default Login;
