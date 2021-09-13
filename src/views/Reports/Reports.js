import { Table, Button, Alert, Space, Popconfirm } from 'antd'
import Column from 'antd/lib/table/Column'
import { PlusSquareOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import routes from '../../shared/routes';
import styles from './Reports.module.css'
import MedicalService from '../../services/MedicalService';

const Reports = () => {
    const history = useHistory();

    const [reports, setReports] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [alertType, setAlertType] = useState('info');
    const [alertMessage, setAlertMessage] = useState('Registre reportes para poder hacer un seguimiento de su estado.');

    const newReport = () => {
        history.push(routes.NEW_REPORT);
    }

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        MedicalService.getReportsByUserId(userId).then((response) => {
            const data = response.data;
            setReports(data);
            if (data.length > 0) {
                MedicalService.getLastReportByUserId(userId).then((response) => {
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
        });
        
    }, []);

    const getSymptoms = (reportId) => {
        MedicalService.getSymptomsByHealthReport(reportId).then((response) => {
            setSymptoms(response.data);
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
            </div>
            <div style={{ width: '90%', margin: '0 auto' }}>
                <Table dataSource={reports} rowKey="id">
                    <Column title="Fecha de registro" dataIndex="register_date" key="register_date"></Column>
                    <Column title="Temperatura °C" dataIndex={['temperature', 'value']} key="temperature"></Column>
                    <Column title="% Saturación de oxígeno" dataIndex={['oxygen', 'value']} key="oxygen"></Column>
                    <Column title="Síntomas" key="symptoms" render={
                        (text, report, index) => (
                            <Space size="middle">
                                { reports[index].symptoms_quantity > 0
                                    ? <>
                                        <Popconfirm cancelButtonProps={{ style: { display: 'none' } }} title={() => symptoms.map(s => s.name).join(", ")}>
                                            <Button className={styles.buttonNoMargin} type="primary" onClick={() => getSymptoms(reports[index].id)}>Ver</Button>
                                        </Popconfirm>
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
