import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

export async function register({ email, username, password }) {
  const respose = await api.post("/register", {
    email,
    username,
    password,
  });
  console.log(respose);
  return respose.data;
}

export async function login({ email, username, password }) {
  const respose = await api.post("/login", {
    email,
    password,
  });
  console.log(respose);
  return respose.data;
}

export async function getMe() {
  const response = await api.get("/get-me");
  return response.data;
}

export async function logout() {
  const response = await api.delete("/logout");
  return response.data;
}
