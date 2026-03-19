import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL
});



api.interceptors.request.use(config => {
  const auth = localStorage.getItem("auth");

  if (auth) {
    const parsed = JSON.parse(auth);

    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }

  return config;
});

export default api;