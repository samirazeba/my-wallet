import axios from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;