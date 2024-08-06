import axios from 'axios';

const protocol = import.meta.env.VITE_SERVER_PROTOCOL;
const host = import.meta.env.VITE_SERVER_HOST;
const port = import.meta.env.VITE_SERVER_PORT;

const axiosInstance = axios.create({
  baseURL: `${protocol}://${host}:${port}`,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (["POST", "PUT", "PATCH"].includes(config.method.toUpperCase())) {
      config.data = config.data || {};
      config.data.user_id = 1;
    }

    if (config.method.toUpperCase() === "GET") {
      config.params = config.params || {};
      config.params.user_id = 1;
    }

    return config;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
