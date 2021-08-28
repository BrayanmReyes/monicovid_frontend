import React from 'react'
import { Input, Form, Button, message } from 'antd'
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './Login.module.css';
import routes from '../../shared/routes';
import { passwordRules } from '../../utils/rules';
import AuthenticationService from '../../services/AuthenticationService';

const ResetPasswordForm = () => {
    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();

    const submit = (values) => {
        values.token = query.get('token');
        AuthenticationService.resetPassword(values).then((response) => {
            if (response.status === 200) {
                message.success("Se ha cambiado la contraseña correctamente");
                history.push(routes.LOGIN);
            } else {
                message.error("No se ha podido cambiar la contraseña. Token inválido.")
            }
        });
    }
    
    const failedSubmit = () => {
        message.warning('Ingrese sus datos correctamente');
    }

    return (
        <Form name="resetPassword" layout="vertical" onFinish={submit} onFinishFailed={failedSubmit}>
            <h1 className={styles.createAccount}>Reestablece tu contraseña</h1>
            <Form.Item className={styles.formItem} label="Contraseña">
                <Form.Item name="password" noStyle rules={passwordRules()}>
                    <Input.Password className={styles.input} placeholder='••••••••'></Input.Password>
                </Form.Item>
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

export default ResetPasswordForm
