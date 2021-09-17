import { Input, Form, Button, message } from 'antd'
import { React } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AuthenticationService from '../../services/AuthenticationService';
import UserService from '../../services/UserService';
import routes from '../../shared/routes';
import { emailRules, passwordRules } from '../../utils/rules';
import jwtDecode from 'jwt-decode';
import styles from './Login.module.css';

const LoginForm = () => {
    const history = useHistory();

    const submit = (values) => {
        AuthenticationService.login(values).then((response) => {
            if (response.status === 200) {
                const token = jwtDecode(response.data.token);
                // TODO: replace for useContext
                sessionStorage.setItem('token', response.data.token);
                UserService.getUser(token.sub).then((response) => {
                    if (response.status === 200) {
                        sessionStorage.setItem('userInfo', JSON.stringify(response.data));
                        message.success("Sesión iniciada correctamente. ¡Bienvenido de vuelta!");
                        history.push(routes.HOME);
                        window.location.reload();
                    } else {
                        message.error('No se ha podido recuperar la información del usuario. Intente nuevamente');
                    }
                });
            }
        });
    }
    
    const failedSubmit = () => {
        message.warning('Ingrese sus datos correctamente');
    }

    return (
        <Form name="login" layout="vertical" onFinish={submit} onFinishFailed={failedSubmit}>
            <Form.Item className={styles.formItem} label="Correo electrónico">
                <Form.Item name="email" noStyle rules={emailRules(true)}>
                    <Input className={styles.input} placeholder='medico@gmail.com'></Input>
                </Form.Item>
                    <p style={{ fontSize: 9.5 }}>Nunca compartiremos su correo con nadie más.</p>
            </Form.Item>
            <Form.Item className={styles.formItem} label="Contraseña">
                <Form.Item name="password" noStyle rules={passwordRules(true)}>
                    <Input.Password className={styles.input} placeholder='••••••••'></Input.Password>
                </Form.Item>
            </Form.Item>
            <Form.Item className={styles.formItem}>
                <Button className={styles.button} htmlType="submit">Siguiente</Button>
                <Link to={routes.FORGOT_PASSWORD}>
                    <p style={{ fontSize: 9.5, color: '#F25270', textAlign: 'center', marginTop: "0.5rem" }}>¿Olvidaste tu contraseña?</p>
                </Link>
            </Form.Item>
            <Form.Item className={styles.formItem}>
                <Link to={routes.SIGN_UP}>
                    <h3 className={styles.createAccount}>Crear cuenta</h3>
                </Link>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
