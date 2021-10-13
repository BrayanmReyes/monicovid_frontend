import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://monicovid-19.herokuapp.com"
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