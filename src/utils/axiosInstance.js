import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000/"
});

axiosInstance.interceptors.request.use((config) => {
    const newConfig = {...config};
    const token = sessionStorage.getItem('token');
    if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
});

export default axiosInstance;