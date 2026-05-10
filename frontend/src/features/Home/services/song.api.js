import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:5000/api/songs",
  baseURL: "/api",
  withCredentials: true,
});

export async function getSongs(mood) {
  const response = await api.get(`?mood=${mood}`);
  return response.data;
}
