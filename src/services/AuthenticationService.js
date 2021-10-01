import axiosInstance from "../utils/axiosInstance";
import { message } from 'antd';

class AuthenticationService {

    async signUp(type, data) {
        try {
            const newUser = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
                dni: data.dni,
                type: type,
            }
            const response = await axiosInstance.post('/auth-api/register', newUser);
            return response;
        } catch(error) {
            return null;
        }
    }

    async login(data) {
        try {
            const login = {
                email: data.email,
                password: data.password
            }
            const response = await axiosInstance.post('/auth-api/login', login);
            return response;
        } catch(error) {
            return null;
        }
    }

    async forgotPassword(data) {
        try {
            const forgotPassword = {
                email: data.email
            }
            const response = await axiosInstance.post('/auth-api/forgot-password', forgotPassword);
            return response;
        } catch(error) {
            return null;
        }
    }

    async resetPassword(data) {
        try {
            const resetPassword = {
                token: data.token,
                password: data.password
            }
            const response = await axiosInstance.post('/auth-api/reset-password', resetPassword);
            return response;
        } catch(error) {
            return null;
        }
    }
}

export default new AuthenticationService();