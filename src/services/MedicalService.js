import axiosInstance from "../utils/axiosInstance";

class MedicalService {

    async getReportsByUserId(userId) {
        try {
            const response = await axiosInstance.get(`/medical-monitoring-api/health_reports`, { params: { patient_id: userId }});
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getLastReportByUserId(userId) {
        try {
            const response = await axiosInstance.get(`/medical-monitoring-api/health_reports/last-report`, { params: { patient_id: userId }});
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async addReportsToUser(data, userId) {
        try {
            const newReport = {
                is_contact_with_infected: data.infected,
                observation: data.observation,
                symptoms: data.symptoms
            }
            const response = await axiosInstance.post(`/medical-monitoring-api/health_reports`, newReport, {
                params: { 
                    oxygen_id: data.oxygenId,
                    temperature_id: data.temperatureId,
                    patient_id: userId
                }
            });
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getSymptomsByHealthReport(healthReportId) {
        try {
            const response = await axiosInstance.get(`/medical-monitoring-api/health_reports/${healthReportId}/symptoms`);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getOxygenReports(patientId) {
        try {
            const response = await axiosInstance.get(`/medical-risks-api/oxygens/reports`, { params: { patient_id: patientId }});
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getTemperatureReports(patientId) {
        try {
            const response = await axiosInstance.get(`/medical-risks-api/temperatures/reports`, { params: { patient_id: patientId }});
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async saveTemperatureRecord(temperature) {
        try {
            const data = {
                value: temperature
            }
            const response = await axiosInstance.post('/medical-risks-api/temperatures', data);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async saveOxygenRecord(oxygen) {
        try {
            const data = {
                value: oxygen
            }
            const response = await axiosInstance.post('/medical-risks-api/oxygens', data);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getPatientsByDoctorId(doctorId) {
        try {
            const response = await axiosInstance.get('/medical-monitoring-api/monitoring/patients', { params: { doctor_id: doctorId }})
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async assignPatientsForDoctor(doctorId, patientId) {
        try {
            const data = {
                doctor_id: doctorId,
                patient_id: patientId
            }
            const response = await axiosInstance.post('/medical-monitoring-api/monitoring', data);
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async unassignPatientsForDoctor(doctorId, patientId) {
        try {
            const data = {
                doctor_id: doctorId,
                patient_id: patientId
            }
            const response = await axiosInstance.delete('/medical-monitoring-api/monitoring', { data: data });
            return response;
        } catch (error) {
            console.log('error: ', error);
        }
    }
}

export default new MedicalService();