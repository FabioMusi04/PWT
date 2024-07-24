import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

axios.defaults.headers.common["Authorization"] = "Bearer your_token_here";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (config) => {
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

/* axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); */

// Add an interceptor for response errors
/* axios.interceptors.response.use(
  (response) => {
    // Do something with successful response
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
); */

export default axios;
