import { Button, Steps, Slider, Input, Radio, Checkbox, Row, Col, message, Modal } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import MedicalService from '../../services/MedicalService';
import styles from './Reports.module.css'
import routes from '../../shared/routes';

const NewReport = () => {
    const { Step } = Steps;
    const { TextArea } = Input;

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    const [page, setPage] = useState(0);
    const [cancelModal, setCancelModal] = useState(false);

    const [temperatureId, setTemperatureId] = useState(0);
    const [oxygenId, setOxygenId] = useState(0);

    const [temperature, setTemperature] = useState(37);
    const [oxygen, setOxygen] = useState(98);
    const [infected, setInfected] = useState('false');
    const [observation, setObservation] = useState('');
    const [symptoms, setSymptoms] = useState([]);

    const history = useHistory();

    const saveTemperature = () => {
        MedicalService.saveTemperatureRecord(temperature).then((response) => {
            if (response.status === 201) {
                setTemperatureId(response.data.id);
                message.success('Temperatura registrada con éxito.');
                next();
            } else {
                message.warning('Error al registrar la temperatura. Vuelva a intentar.');
            }
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }

    const saveOxygen = () => {
        MedicalService.saveOxygenRecord(oxygen).then((response) => {
            if (response.status === 201) {
                setOxygenId(response.data.id);
                message.success('Saturación de oxígeno registrada con éxito.');
                next();
            } else {
                message.warning('Error al registrar la saturación de oxígeno. Vuelva a intentar.');
            }
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }

    const saveReport = () => {
        const newReportData = {
            infected: infected,
            observation: observation,
            symptoms: symptoms,
            oxygenId: oxygenId,
            temperatureId: temperatureId
        }
        
        MedicalService.addReportsToUser(newReportData, user.id).then((response) => {
            if (response.status === 201) {
                message.success('Reporte registrado con éxito.');
                back();
            } else {
                message.warning('Error al registrar reporte. Vuelva a intentar.');
            }
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }
 
    const next = () => {
        setPage(page + 1);
    }

    const cancel = () => {
        setCancelModal(true);
    }

    const back = () => {
        history.push(routes.REPORTS);
    }

    const goOn = () => {
        setCancelModal(false);
    }

    const temperatureFormatter = (value) => {
        return `${value} °C`;
    }

    const temperatureMarks = {
        35: '35 °C',
        36: '36 °C',
        37: '37 °C',
        38: '38 °C',
        39: '39 °C',
        40: '40 °C',
        41: '41 °C',
    }

    const oxygenFormatter = (value) => {
        return `${value}%`;
    }

    const oxygenMarks = {
        80: '80%',
        81: '81%',
        82: '82%',
        83: '83%',
        84: '84%',
        85: '85%',
        86: '86%',
        87: '87%',
        88: '88%',
        89: '89%',
        90: '90%',
        91: '91%',
        92: '92%',
        93: '93%',
        94: '94%',
        95: '95%',
        96: '96%',
        97: '97%',
        98: '98%',
        99: '99%',
        100: '100%',
    }

    return (
        <>
            <div style={{ width: '90%', margin: '1.5rem auto' }}>
                <Steps current={page}>
                    <Step title="Temperatura"></Step>
                    <Step title="Saturación de Oxígeno"></Step>
                    <Step title="Síntomas"></Step>
                </Steps>
                <div style={{ margin: '1.5rem auto' }}>
                    { page === 0 && (
                        <>
                            <p style={{ color: '#F25270', fontSize: '2rem' }}>Recomendaciones</p>
                            <ul style={{ color: '#F25270', fontSize: '1.2rem' }}>
                                <li>Si se mide debajo de la axila sumar 0.5 °C</li>
                                <li>La medida debajo de la lengua es la más precisa</li>
                            </ul>
                            <div style={{ margin: '3.5rem 0' }}>
                                <Slider min={35} max={41} step={0.1} value={temperature}
                                    tipFormatter={temperatureFormatter} tooltipVisible
                                    marks={temperatureMarks} onChange={(value) => setTemperature(value)}
                                />
                            </div>
                            <Button className={styles.button} onClick={() => cancel()}>Cancelar</Button>&nbsp;
                            <Button className={styles.button} onClick={() => saveTemperature()}>Siguiente</Button>
                        </>
                    )}
                    { page === 1 && (
                        <>
                            <p style={{ color: '#F25270', fontSize: '2rem' }}>Recomendaciones</p>
                            <ul style={{ color: '#F25270', fontSize: '1.2rem' }}>
                                <li>Asegúrese de que la uña no tenga esmalte</li>
                                <li>Que la mano esté tibia, relajada y sostenida por debajo del nivel del corazón</li>
                                <li>Debe también sentarse quieto y no mover la parte del cuerpo donde se encuentra el oxímetro de pulso</li>
                                <li>Espere unos segundos hasta que la lectura deje de cambiar y muestre un número fijo</li>
                            </ul>
                            <div style={{ margin: '3.5rem 0' }}>
                                <Slider min={80} max={100} step={0.1} value={oxygen}
                                    tipFormatter={oxygenFormatter} tooltipVisible
                                    marks={oxygenMarks} onChange={(value) => setOxygen(value)}
                                />
                            </div>
                            <Button className={styles.button} onClick={() => cancel()}>Cancelar</Button>&nbsp;
                            <Button className={styles.button} onClick={() => saveOxygen()}>Siguiente</Button>
                        </>
                    )}
                    { page === 2 && (
                        <>
                            <p style={{ color: '#F25270', fontSize: '1.5rem' }}>
                                ¿Usted tuvo contacto con alguna persona con síntomas de COVID-19?
                            </p>
                            <Radio.Group name="infected" style={{ margin: '0 0 0.7rem 0' }} value={infected} onChange={(e) => setInfected(e.target.value)}>
                                <Radio value={'false'}>No</Radio>
                                <Radio value={'true'}>Sí</Radio>
                            </Radio.Group>
                            <p style={{ color: '#F25270', fontSize: '1.5rem' }}>
                                Observaciones
                            </p>
                            <TextArea rows={3} value={observation} onChange={(e) => setObservation(e.target.value)} />
                            <p style={{ color: '#F25270', fontSize: '1.5rem', margin: '1.5rem 0' }}>
                                Seleccione los síntomas que presenta:
                            </p>
                            <Checkbox.Group value={symptoms} onChange={(value) => setSymptoms(value)}>
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value={1}>Dolor muscular o articulaciones</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={2}>Malestar general o fatiga</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={3}>Tos seca</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={4}>Dolor de garganta</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={5}>Pérdida del gusto</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={6}>Pérdida del olfato</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={7}>Enrojecimiento de la piel</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={8}>Diarrea</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={9}>Vómitos</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                            <div style={{ marginTop: '1rem' }}>
                                <Button className={styles.button} onClick={() => cancel()}>Cancelar</Button>&nbsp;
                                <Button className={styles.button} onClick={() => saveReport()}>Enviar</Button>
                            </div>
                        </>
                    )}
                    <Modal
                        title="¿Seguro que desea cancelar?"
                        okText="Sí, cancelar" cancelText="Regresar"
                        visible={cancelModal}
                        onOk={() => back()}
                        onCancel={() => goOn()}
                    >
                        <p>Perderá todo lo que ha registrado hasta ahora.</p>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default NewReport
