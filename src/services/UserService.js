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

    async getPatient(patientId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/patients/${patientId}`);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getPatientComorbidities(patientId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/patients/${patientId}/comorbidities`);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getDoctor(doctorId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/doctors/${doctorId}`);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async editPatient(data, comorbidities, patientId) {
        try {
            const patientData = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
                phone: data.phone,
                address: data.address,
                dni: data.dni,
                recovered: data.recovered? 'true' : 'false',
                comorbidities: comorbidities
            }
            const response = await axiosInstance.put(`/profiles-api/patients/${patientId}`, patientData);
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