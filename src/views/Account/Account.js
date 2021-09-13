import React, { useEffect, useState } from 'react'
import { Input, Form, Button, Col, Row, message, Checkbox } from 'antd'
import { defaultRules, emailRules, passwordNotRequiredRules, dniRules, phoneNotRequiredRules } from '../../utils/rules';
import styles from './Account.module.css';
import UserService from '../../services/UserService';

const Account = () => {
    const [form] = Form.useForm();

    const [comorbidities, setComorbidities] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        UserService.getUser(userId).then((response) => {
            // TODO: momentáneo mientras no se use el useContext
            if (response.data.type === 'patient') {
                UserService.getPatient(userId).then((response) => {
                    fillForm(response.data);
                    UserService.getPatientComorbidities(userId).then((response) => {
                        console.log('response: ', response);
                        setComorbidities(response.data.map(c => c.id));
                    });
                });
            }
        });
    }, []);

    const fillForm = (values) => {
        form.setFieldsValue({
            firstName: values.first_name,
            lastName: values.last_name,
            dni: values.dni,
            email: values.email,
            address: values.address,
            phone: values.phone,
            recovered: values.recovered
        });
    }

    const submit = (values) => {
        if (values.password === values.confirmation) {
            values.password = values.password === undefined? null : values.password;
            const userId = sessionStorage.getItem('userId');
            UserService.editPatient(values, comorbidities, userId).then((response) => {
                if (response.status === 200) {
                    message.success('El perfil ha sido actualizado correctamente');
                } else {
                    message.warning('Error al actualizar el perfil. Por favor inténtelo de nuevo');
                }
            });
        } else {
            message.warning('La contraseña y la confirmación no coinciden.');
        }
    }
    
    const failedSubmit = () => {
        message.warning('Ingrese sus datos correctamente');
    }

    return (
        <>
            <Form form={form} className={styles.form} name="edit" layout="vertical" onFinish={submit} onFinishFailed={failedSubmit}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item label="Nombre" name="firstName" rules={defaultRules('nombre')}>
                            <Input className={styles.input} placeholder='José'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item label="Apellidos" name="lastName" rules={defaultRules('apellidos')}>
                            <Input className={styles.input} placeholder='Martínez Vega'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="DNI" name="dni" rules={dniRules()}>
                    <Input className={styles.input} maxLength="8" placeholder='98765432'></Input>
                </Form.Item>
                <Form.Item label="Correo electrónico" name="email" rules={emailRules()}>
                    <Input className={styles.input} placeholder='persona@ejemplo.com'></Input>
                </Form.Item>
                <Form.Item label="Dirección" name="address">
                    <Input className={styles.input} placeholder='Av. Siempreviva 742'></Input>
                </Form.Item>
                <Form.Item label="Teléfono" name="phone" rules={phoneNotRequiredRules()}>
                    <Input className={styles.input} placeholder='987654321'></Input>
                </Form.Item>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item label="Contraseña" name="password" rules={passwordNotRequiredRules()} extra="Solo rellena este campo si deseas cambiar tu contraseña">
                            <Input.Password className={styles.input} placeholder='••••••••'></Input.Password>
                        </Form.Item>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item label="Confirmación" name="confirmation" rules={passwordNotRequiredRules()} extra="Debe coincidir con el campo Contraseña">
                            <Input.Password className={styles.input} placeholder='••••••••'></Input.Password>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="recovered" valuePropName="checked">
                    <Checkbox>¿Usted se encuentra recuperado?</Checkbox>
                </Form.Item>
                <p style={{ color: '#F25270', fontSize: '1rem', margin: '0.7rem 0' }}>
                    Seleccione las comorbilidades que presenta:
                </p>
                <Checkbox.Group value={comorbidities} onChange={(value) => setComorbidities(value)}>
                    <Row>
                        <Col span={8}>
                            <Checkbox value={1}>Obesidad</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value={2}>Diabetes</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value={3}>Hipertensión</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value={4}>Enf. Resp. Crónica</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value={5}>Enf. Cardiovascular</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
                <Form.Item>
                    <Button className={styles.button} htmlType="submit">Actualizar perfil</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Account
