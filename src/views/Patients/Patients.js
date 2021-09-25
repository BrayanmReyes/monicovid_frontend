import React, { useEffect, useState } from 'react'
import { Table, Space, Popconfirm, message, Modal, Button } from 'antd'
import Column from 'antd/lib/table/Column'
import { DeleteOutlined, DiffOutlined, AuditOutlined } from '@ant-design/icons';
import MedicalService from '../../services/MedicalService';
import UserService from '../../services/UserService';

const Patients = () => {
    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false);
    const [reportsModal, setReportsModal] = useState(false);

    const [details, setDetails] = useState({});
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (!loading) {
            MedicalService.getPatientsByDoctorId(user.id).then((response) => {
                if (response.status === 200) {
                    setPatients(response.data);
                }
            });
        }
    }, [ loading ]);

    const patientDetails = (patientId) => {
        UserService.getPatient(patientId).then((response) => {
            if (response.status === 200) {
                setDetailsModal(true);
                setDetails(response.data);
            }
        });
    }

    const patientReports = (patientId) => {
        setReportsModal(true);
        MedicalService.getReportsByUserId(patientId).then((response) => {
            if (response.status === 200) {
                setReports(response.data);
            }
        });
    }

    const deletePatient = (patientId) => {
        setLoading(true);
        MedicalService.unassignPatientsForDoctor(user.id, patientId).then((response) => {
            if (response.status === 200) {
                message.success("Paciente eliminado correctamente.");
                setLoading(false);
            } else {
                setLoading(false);
                message.warning('Error al eliminar paciente. Intente nuevamente.');
            }
        }).catch(() => {
            setLoading(false);
            message.warning("Error al eliminar paciente. Intente nuevamente");
        });
    }

    return (
        <div style={{ width: '90%', margin: '1.5rem auto' }}>
            <Table dataSource={patients} rowKey="id">
                <Column title="DNI" dataIndex="dni" key="dni" />
                <Column title="Nombre" dataIndex="first_name" key="first_name" />
                <Column title="Apellidos" dataIndex="last_name" key="last_name" />
                <Column title="Correo electrónico" dataIndex="email" key="email" />
                <Column title="Acciones" key="actions" render={
                    (text, patient) => (
                        <Space size="middle">
                            <Button type="primary" icon={<AuditOutlined />} onClick={() => patientDetails(patient.id)}>Ver detalles</Button>
                            <Modal title="Detalles del paciente" visible={detailsModal} onOk={() => setDetailsModal(false)} okText="Listo" cancelButtonProps={{ style: { display: 'none' } }}>
                                <ul>
                                    <li><strong>Nombre: </strong> { details.first_name }</li>
                                    <li><strong>Apellidos: </strong> { details.last_name }</li>
                                    <li><strong>DNI: </strong> { details.dni }</li>
                                    <li><strong>Correo electrónico: </strong> { details.email }</li>
                                </ul>
                            </Modal>
                            <Button type="primary" icon={<DiffOutlined />} onClick={() => patientReports(patient.id)}>Ver reportes</Button>
                            <Modal title="Reportes del paciente" visible={reportsModal} onOk={() => setReportsModal(false)} okText="Listo" cancelButtonProps={{ style: { display: 'none' } }}>
                                
                            </Modal>
                            <Popconfirm
                                    title="¿Seguro que desea eliminar este paciente?"
                                    onConfirm={() => deletePatient(patient.id)}
                                    okButtonProps={{ loading: loading }}
                                    okText="Sí"
                                    cancelText="No"
                                >
                                <Button icon={<DeleteOutlined />} danger>Eliminar</Button>
                            </Popconfirm>
                        </Space>
                    )
                } />
            </Table>
        </div>
    )
}

export default Patients
