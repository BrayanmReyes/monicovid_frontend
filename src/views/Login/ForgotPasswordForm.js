import React from 'react'
import { Input, Form, Button, message } from 'antd'
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import routes from '../../shared/routes';
import AuthenticationService from '../../services/AuthenticationService';
import { emailRules } from '../../utils/rules';

const ForgotPasswordForm = () => {
    const submit = (values) => {
        AuthenticationService.forgotPassword(values).then((response) => {
            switch (response.status) {
                case 200:
                    message.success("Se ha enviado un mensaje al correo electrónico proporcionado.")
                    break;
                case 202:
                    message.warn("El correo electrónico proporcionado no se encuentra registrado.")
                    break;
                default:
                    message.error("No se pudo enviar el mensaje.")
                    break;
            }
        });
    }
    
    const failedSubmit = () => {
        message.warning('Ingrese sus datos correctamente');
    }

    return (
        <Form name="forgotPassword" layout="vertical" onFinish={submit} onFinishFailed={failedSubmit}>
            <h1 className={styles.createAccount}>Recupera tu cuenta</h1>
            <Form.Item className={styles.formItem} label="Correo electrónico">
                <Form.Item name="email" noStyle rules={emailRules(true)}>
                    <Input className={styles.input} placeholder='medico@gmail.com'></Input>
                </Form.Item>
                    <p style={{ fontSize: 9.5 }}>Nunca compartiremos su correo con nadie más.</p>
            </Form.Item>
            <Form.Item className={styles.formItem}>
                <Button className={styles.button} htmlType='submit'>Siguiente</Button>
            </Form.Item>
            <Form.Item className={styles.formItem}>
                <Link to={routes.LOGIN}>
                    <h3 className={styles.createAccount}>Cancelar</h3>
                </Link>
            </Form.Item>
        </Form>
    )
}

export default ForgotPasswordForm
