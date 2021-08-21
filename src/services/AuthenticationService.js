import axiosInstance from "../utils/axiosInstance";

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
            const response = await axiosInstance.post('/profiles-api/users', newUser);
            return response;
        } catch(error) {
            console.log('error: ', error);
        }
    }

    async login(data) {
        try {
            const login = {
                email: data.email,
                password: data.password
            }
            const response = await axiosInstance.post('/profiles-api/login', login);
            return response;
        } catch(error) {
            console.log('error: ', error);
        }
    }
}

export default new AuthenticationService();