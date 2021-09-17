import { Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react'
import styles from './Recommendations.module.css'
import UserService from '../../services/UserService';

const Recommendations = () => {
    const { confirm } = Modal;

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    const recovered = () => {
        confirm({
            title: '¿Está seguro?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Sí',
            cancelText: 'No',
            onOk() {
                const data = {
                    recovered: 'true',
                }
                UserService.editPatient(data, null, user.id).then((response) => {
                    if (response.status === 200) {
                        message.success('El perfil ha sido actualizado correctamente');
                    } else {
                        message.warning('Error al actualizar el perfil. Por favor inténtelo de nuevo');
                    }
                })
            },
        });
    }

    return (
        <>
            <p className={styles.titulos}>Te damos algunos consejos:</p>
            <p className={styles.parrafos}>Te recomendamos monitorearte cada 8 horas para mantener un control adecuado de sus parámetros.</p>
            <p className={styles.parrafos}>Por ejemplo, puedes monitorearte a las 7 am., luego a las 3 pm. y finalmente a las 11pm.</p>
            <div className={styles.space}>&nbsp;</div>
            <p className={styles.titulos}>¿Dónde acudir?</p>
            <p className={styles.parrafos}>Llama al 113 o dirígete a un establecimiento que cuente con punto COVID.</p>
            <p className={styles.parrafos}>Actualmente también hay Centros de Aislamiento Temporal y Seguimiento (CATS) en todas las regiones del país.</p>
            <p className={styles.parrafos}>
                Si deseas conocer más información haz clic
                <a href="https://www.gob.pe/8733-cuidar-a-un-paciente-sospechoso-de-haber-contraido-coronavirus-covid-19"> aquí</a>
            </p>
            <div className={styles.space}>&nbsp;</div>
            <p className={styles.parrafos}>Si ya te encuentras recuperado, haz clic <Button className={styles.link} type="link" onClick={() => recovered()}>aquí</Button></p>
        </>
    )
}

export default Recommendations
