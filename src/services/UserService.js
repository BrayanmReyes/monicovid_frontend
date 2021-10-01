import axiosInstance from "../utils/axiosInstance";

class UserService {
    async getUser(userId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/users/${userId}`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getPatients() {
        try {
            const response = await axiosInstance.get(`/profiles-api/patients`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getPatient(patientId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/patients/${patientId}`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getPatientComorbidities(patientId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/patients/${patientId}/comorbidities`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getDoctor(doctorId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/doctors/${doctorId}`);
            return response;
        } catch (error) {
            return null;
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
            return null;
        }
    }

    async editDoctor(data, doctorId) {
        try {
            const doctorData = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
                phone: data.phone,
                address: data.address,
                dni: data.dni,
                speciality: data.speciality,
            }
            const response = await axiosInstance.put(`/profiles-api/doctors/${doctorId}`, doctorData);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getContactsByUserId(userId) {
        try {
            const response = await axiosInstance.get(`/profiles-api/contacts`, { params: { patient_id: userId }});
            return response;
        } catch (error) {
            return null;
        }
    }

    async addContactToUser(data, userId) {
        try {
            const response = await axiosInstance.post(`/profiles-api/contacts`, data, { params: { patient_id: userId }});
            return response;
        } catch (error) {
            return null;
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
            return null;
        }
    }

    async deleteContact(contactId) {
        try {
            const response = await axiosInstance.delete(`/profiles-api/contacts/${contactId}`);
            return response;
        } catch (error) {
            return null;
        }
    }
}

export default new UserService();