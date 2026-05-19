import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 🔹 Attach token to every request automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 🔹 Handle expired or invalid token responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      if (!window.location.pathname.includes("/login")) {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default API;

// if (error.response?.status === 401) {
//   // Token expired or invalid — force logout
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   window.location.href = "/login";
// }
