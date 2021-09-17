import React, { useEffect } from 'react'
import { Input, Form, Button, Col, Row, message } from 'antd'
import { defaultRules, emailRules, dniRules, passwordRules, phoneRules } from '../../utils/rules';
import styles from './Account.module.css';
import UserService from '../../services/UserService';

const DoctorAccount = () => {
    const [form] = Form.useForm();

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    useEffect(() => {
        if (user.type === 'doctor') {
            UserService.getDoctor(user.id).then((response) => {
                fillForm(response.data);
            });
        }
    }, []);

    const fillForm = (values) => {
        form.setFieldsValue({
            firstName: values.first_name,
            lastName: values.last_name,
            dni: values.dni,
            email: values.email,
            address: values.address,
            phone: values.phone,
            speciality: values.speciality
        });
    }

    const submit = (values) => {
        if (values.password === values.confirmation) {
            values.password = values.password === undefined? null : values.password;
            UserService.editDoctor(values, user.id).then((response) => {
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
                <Form.Item label="DNI" name="dni" rules={dniRules(true)}>
                    <Input className={styles.input} maxLength="8" placeholder='98765432'></Input>
                </Form.Item>
                <Form.Item label="Correo electrónico" name="email" rules={emailRules(true)}>
                    <Input className={styles.input} placeholder='persona@ejemplo.com'></Input>
                </Form.Item>
                <Form.Item label="Dirección" name="address">
                    <Input className={styles.input} placeholder='Av. Siempreviva 742'></Input>
                </Form.Item>
                <Form.Item label="Teléfono" name="phone" rules={phoneRules(false)}>
                    <Input className={styles.input} placeholder='987654321'></Input>
                </Form.Item>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item label="Contraseña" name="password" rules={passwordRules(false)} extra="Solo rellena este campo si deseas cambiar tu contraseña">
                            <Input.Password className={styles.input} placeholder='••••••••'></Input.Password>
                        </Form.Item>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item label="Confirmación" name="confirmation" rules={passwordRules(false)} extra="Debe coincidir con el campo Contraseña">
                            <Input.Password className={styles.input} placeholder='••••••••'></Input.Password>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Especialidad" name="speciality">
                    <Input className={styles.input} placeholder='Pediatra'></Input>
                </Form.Item>
                <Form.Item>
                    <Button className={styles.button} htmlType="submit">Actualizar perfil</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default DoctorAccount
