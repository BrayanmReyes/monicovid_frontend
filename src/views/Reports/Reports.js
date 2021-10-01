import { Table, Button, Alert, Space, Modal } from 'antd'
import Column from 'antd/lib/table/Column'
import { PlusSquareOutlined, AreaChartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import routes from '../../shared/routes';
import styles from './Reports.module.css'
import MedicalService from '../../services/MedicalService';
import { message } from 'antd';

const Reports = () => {
    const history = useHistory();

    const [reports, setReports] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [symptomsModal, setSymptomsModal] = useState(false);
    const [alertType, setAlertType] = useState('info');
    const [alertMessage, setAlertMessage] = useState('Registre reportes para poder hacer un seguimiento de su estado.');

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    const newReport = () => {
        history.push(routes.NEW_REPORT);
    }

    const graphs = () => {
        history.push(routes.GRAPHS);
    }

    useEffect(() => {
        MedicalService.getReportsByUserId(user.id).then((response) => {
            const data = response.data;
            setReports(data);
            if (data.length > 0) {
                MedicalService.getLastReportByUserId(user.id).then((response) => {
                    if (response.status === 200) {
                        if (response.data.delicate_health) {
                            setAlertType('error');
                            setAlertMessage('Usted se encuentra delicado. Por favor acuda a un centro de salud');
                        } else {
                            setAlertType('success');
                            setAlertMessage('Usted se encuentra bien.');
                        }
                    }
                });
            }
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }, []);

    const getSymptoms = (reportId) => {
        setSymptomsModal(true);
        MedicalService.getSymptomsByHealthReport(reportId).then((response) => {
            setSymptoms(response.data);
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }

    return (
        <>
            <div style={{ marginLeft: '5%', marginBottom: '2rem', marginTop: '2rem' }}>
                <Alert type={alertType} description={alertMessage} showIcon></Alert>
            </div>
            <div style={{ marginLeft: '5%', marginBottom: '2rem', marginTop: '2rem' }}>
                <Button style={{ backgroundColor: '#F25270', color: 'white' }} icon={<PlusSquareOutlined />} onClick={() => newReport()}>
                    Nuevo reporte
                </Button>
                <Button style={{ backgroundColor: '#F25270', color: 'white', marginLeft: '1rem' }} icon={<AreaChartOutlined />} onClick={() => graphs()}>
                    Ver gráficos
                </Button>
            </div>
            <div style={{ width: '90%', margin: '0 auto' }}>
                <Table dataSource={reports} rowKey="id">
                    <Column title="Fecha de registro" dataIndex="register_date" key="register_date"></Column>
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
                                        <Modal title="Síntomas" visible={symptomsModal} onOk={() => setSymptomsModal(false)} okText="Entendido" cancelButtonProps={{ style: { display: 'none' } }}>
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
                </Table>
            </div>
        </>
    )
}

export default Reports
