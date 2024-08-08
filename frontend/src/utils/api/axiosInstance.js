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
  timeout: 10000, // 10 seconds timeout
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    config.params.user_id = 1;

    return config;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out:', error.message);
    } else if (error.response) {
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
