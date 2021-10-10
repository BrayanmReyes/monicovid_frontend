import React, { useEffect, useState } from 'react'
import { Table, Space, Popconfirm, message, Modal, Button, Collapse } from 'antd'
import Column from 'antd/lib/table/Column'
import { DeleteOutlined, DiffOutlined, AuditOutlined, FileExcelOutlined } from '@ant-design/icons';
import MedicalService from '../../services/MedicalService';
import UserService from '../../services/UserService';
import Graphs from '../Reports/Graphs';
import styles from './Patients.module.css'
import fileDownload from 'js-file-download';

const Patients = () => {
    const { Panel } = Collapse;

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false);
    const [reportsModal, setReportsModal] = useState(false);
    const [symptomsModal, setSymptomsModal] = useState(false);
    
    const [details, setDetails] = useState({});
    const [reports, setReports] = useState([]);
    const [symptoms, setSymptoms] = useState([]);

    useEffect(() => {
        if (!loading) {
            MedicalService.getPatientsByDoctorId(user.id).then((response) => {
                if (response.status === 200) {
                    setPatients(response.data);
                }
            }).catch(() => {
                message.error('Error del servicio.');
            });
        }
    }, [ loading ]);

    const patientDetails = (patient) => {
        UserService.getPatient(patient.id).then((response) => {
            if (response.status === 200) {
                setDetailsModal(true);
                setDetails(response.data);
            }
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }

    const patientReports = (patient) => {
        setReportsModal(true);
        MedicalService.getReportsByUserId(patient.id).then((response) => {
            if (response.status === 200) {
                setReports(response.data);
            }
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }

    const getSymptoms = (reportId) => {
        setSymptomsModal(true);
        MedicalService.getSymptomsByHealthReport(reportId).then((response) => {
            setSymptoms(response.data);
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }

    const deletePatient = (patient) => {
        setLoading(true);
        MedicalService.unassignPatientsForDoctor(user.id, patient.id).then((response) => {
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

    const downloadReport = (report) => {
        MedicalService.getExcelByHealthReport(report.id).then((response) => {
            fileDownload(response.data, `reporte_${report.id}.xlsx`);
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }

    const downloadLastThreeDaysReport = () => {
        MedicalService.getLastThreeDaysReportExcelByUserId(reports[0].patient.id).then((response) => {
            fileDownload(response.data, `reporte_ultimos_dias_${reports[0].patient.id}.xlsx`);
        }).catch(() => {
            message.error('Error del servicio.');
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
                            <Button type="primary" icon={<AuditOutlined />} onClick={() => patientDetails(patient)}>Ver detalles</Button>
                            <Modal title="Detalles del paciente" visible={detailsModal} onOk={() => setDetailsModal(false)} onCancel={() => setDetailsModal(false)} okText="Listo" cancelButtonProps={{ style: { display: 'none' } }}>
                                <ul>
                                    <li><strong>Nombre: </strong> { details.first_name }</li>
                                    <li><strong>Apellidos: </strong> { details.last_name }</li>
                                    <li><strong>DNI: </strong> { details.dni }</li>
                                    <li><strong>Correo electrónico: </strong> { details.email }</li>
                                    <li><strong>¿Recuperado?: </strong> { details.recovered? 'Sí' : 'No' }</li>
                                    { details.recovered && <li><strong>Fecha de recuperación: </strong> { details.recovered_date }</li> }
                                </ul>
                            </Modal>
                            <Button type="primary" icon={<DiffOutlined />} onClick={() => patientReports(patient)}>Ver reportes</Button>
                            <Modal
                                title="Reportes del paciente"
                                visible={reportsModal}
                                onOk={() => setReportsModal(false)}
                                onCancel={() => setReportsModal(false)}
                                okText="Listo"
                                cancelButtonProps={{ style: { display: 'none' } }}
                                width="70%"
                            >
                                { reports.length > 0 &&
                                    <Collapse accordion>
                                        <Panel header="Reportes" key="1">
                                            <Button type="danger" icon={<FileExcelOutlined />} style={{ margin: '0.5rem 0' }} onClick={() => downloadLastThreeDaysReport()}>Descargar reportes de los últimos 3 días</Button>
                                            <Table dataSource={reports} rowKey="id">
                                                <Column title="Fecha" dataIndex="register_date" key="register_date"></Column>
                                                <Column title="Temperatura °C" dataIndex={['temperature', 'value']} key="temperature" render={
                                                    (text, record) => (
                                                        <div style={{ color: parseInt(text) > 38? 'red' : 'black' }}>{text}</div>
                                                    )
                                                }></Column>
                                                <Column title="% Saturación de oxígeno" dataIndex={['oxygen', 'value']} key="oxygen" render={
                                                    (text, record) => (
                                                        <div style={{ color: parseInt(text) < 92? 'red' : 'black' }}>{text}</div>
                                                    )
                                                }></Column>
                                                <Column title="Síntomas" key="symptoms" render={
                                                    (text, report, index) => (
                                                        <Space size="middle">
                                                            { reports[index].symptoms_quantity > 0
                                                                ? <>
                                                                    <Button className={styles.buttonNoMargin} type="primary" onClick={() => getSymptoms(reports[index].id)}>Ver</Button>
                                                                    <Modal title="Síntomas" visible={symptomsModal} onOk={() => setSymptomsModal(false)} onCancel={() => setSymptomsModal(false)} okText="Entendido" cancelButtonProps={{ style: { display: 'none' } }}>
                                                                        <ul>{ symptoms.map(function(s, i) {
                                                                            return (<li key={i}>{s.name}</li>)
                                                                        })}</ul>
                                                                    </Modal>
                                                                </>
                                                                : <p>No se reportaron</p>
                                                            }
                                                        </Space>
                                                    )
                                                } />
                                                <Column title="Descargar" key="download" render={
                                                    (text, report, index) => (
                                                        <Space size="middle">
                                                            <Button icon={<FileExcelOutlined />} type="default" onClick={() => downloadReport(report)}>Descargar reporte</Button>
                                                        </Space>
                                                    )
                                                } />
                                            </Table>
                                        </Panel>
                                        <Panel header="Gráficos" key="2">
                                            <Graphs userId={reports[0].patient.id}></Graphs>
                                        </Panel>
                                    </Collapse>
                                }
                                { reports.length < 1 && 
                                    <p>No hay reportes registrados</p>
                                }
                            </Modal>
                            <Popconfirm
                                    title="¿Seguro que desea eliminar este paciente?"
                                    onConfirm={() => deletePatient(patient)}
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
