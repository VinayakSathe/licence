// // import axios from "axios";
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // // Create Axios instance
// // const api = axios.create({
// //   baseURL:  API_BASE_URL, // Replace with your backend URL
// // });

// // // Request Interceptor - Attach JWT to Every API Request
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token"); // Get JWT from storage

// //     // Add Authorization header for secured APIs
// //     if (token && !config.headers["Authorization"]) {
// //       config.headers["Authorization"] = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // Response Interceptor - Handle Unauthorized Access & Token Expiry
// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response && error.response.status === 401) {
// //       console.warn("Unauthorized! Logging out...");

// //       // Handle Token Expiry - Clear Storage and Redirect to Login
// //       localStorage.removeItem("token");
// //       window.location.href = "/login"; // Redirect to login page
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default api;



// import axios from "axios";
// import { decodeToken } from "./authUtils";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Attach Token to Requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle Expired Tokens
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const token = localStorage.getItem("token");
//       const decoded = decodeToken(token);

//       if (decoded && decoded.exp * 1000 < Date.now()) {
//         console.warn("Token expired, logging out...");
//         localStorage.removeItem("token");
//         window.location.href = "/login"; // Redirect to login
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



import axios from "axios";
import { decodeToken } from "./authUtils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// List of APIs that do not require authentication
const publicEndpoints = [
  "/login",
//   "/auth/register",
//   "/public/data",
];

// Attach Token to Requests (Only for Protected APIs)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Check if the request is for a public API
    const isPublicAPI = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (token && !isPublicAPI) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Expired Tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem("token");
      const decoded = decodeToken(token);

      if (decoded && decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired, logging out...");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
