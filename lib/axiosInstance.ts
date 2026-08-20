import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://logisfi-pro-api-production.somee.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or any other headers if needed
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
