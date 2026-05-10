import axios from "axios";

const api = axios.create({
  baseURL: "/api/songs",

  withCredentials: true,
});

export async function getSongs(mood) {
  const response = await api.get(`?mood=${mood}`);
  return response.data;
}
