import { Table, Button, Alert, Space, Tag } from 'antd'
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

    const newReport = () => {
        history.push(routes.NEW_REPORT);
    }

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        MedicalService.getReportsByUserId(userId).then((response) => {
            const data = response.data;
            data.forEach(d => {
                d.hidden = true;
                d.symptoms = [];
            });
            setReports(data);
        });
    }, []);

    const symptoms = (reportId, index) => {
        MedicalService.getSymptomsByHealthReport(reportId).then((response) => {
            reports[index].hidden = false;
            setReports(reports);
            console.log('reports: ', reports);
            console.log('response: ', response);
        });
    }

    return (
        <>
            <div style={{ marginLeft: '5%', marginBottom: '2rem', marginTop: '2rem' }}>
                <Alert type="success" description="Usted se encuentra bien" showIcon></Alert>
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
                                { reports[index].symptoms_quantity > 0 && reports[index].hidden &&
                                    <Button className={styles.buttonNoMargin} type="primary" onClick={() => symptoms(reports[index].id, index)}>Ver</Button> }
                                { reports[index].symptoms_quantity > 0 && !reports[index].hidden &&
                                    <Tag color="#F25270">Holi</Tag> }
                                { reports[index].symptoms_quantity === 0 && <p>No se reportaron</p> }
                            </Space>
                        )
                    } />
                </Table>
            </div>
        </>
    )
}

export default Reports
