import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});
client.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
// ✅ Handle invalid token / deleted user
client.interceptors.response.use(
  (response) => response,

  (error) => {
    // Unauthorized
    if (error.response?.status === 401) {

      // remove token
      sessionStorage.removeItem("token");

      // redirect login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default client;