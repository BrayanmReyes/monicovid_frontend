import axiosInstance from "../utils/axiosInstance";

class UserService {
    async getUser(userId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/users/${userId}`);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getContactsByUserId(userId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/contacts`, { params: { patient_id: userId }});
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async addContactToUser(data, userId) {
        try {
            const response = await axiosInstance.post(`/profiles-api/contacts`, data, { params: { patient_id: userId }});
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async editContact(data, contactId) {
        try {
            const contact = {
                name: data.name,
                email: data.email,
                phone: data.phone
            }
            const response = await axiosInstance.put(`/profiles-api/contacts/${contactId}`, contact);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async deleteContact(contactId) {
        try {
            const response = await axiosInstance.delete(`/profiles-api/contacts/${contactId}`);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }
}

export default new UserService();