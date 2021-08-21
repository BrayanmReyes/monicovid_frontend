import { Input, Form, Button, message } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import AuthenticationService from '../../services/AuthenticationService';
import routes from '../../shared/routes';
import { emailRules, passwordRules } from '../../utils/rules';
import jwtDecode from 'jwt-decode';
import './Login.css';

const LoginForm = () => {
    const submit = (values) => {
        AuthenticationService.login(values).then((response) => {
            if (response.status === 200) {
                const token = jwtDecode(response.data.token);
                // TODO: replace for useContext
                sessionStorage.setItem('token', token.sub);
                message.success("Sesión iniciada correctamente. ¡Bienvenido de vuelta!");
                // TODO: redirect to home page
            }
        });
    }
    
    const failedSubmit = () => {
        message.warning('Ingrese sus datos correctamente');
    }

    return (
        <Form name="login" layout="vertical" onFinish={submit} onFinishFailed={failedSubmit}>
            <Form.Item className="formItem" label="Correo electrónico">
                <Form.Item name="email" noStyle rules={emailRules()}>
                    <Input className="input" placeholder='medico@gmail.com'></Input>
                </Form.Item>
                    <p style={{ fontSize: 9.5 }}>Nunca compartiremos su correo con nadie más.</p>
            </Form.Item>
            <Form.Item className="formItem" label="Contraseña">
                <Form.Item name="password" noStyle rules={passwordRules()}>
                    <Input.Password className="input" placeholder='••••••••'></Input.Password>
                </Form.Item>
            </Form.Item>
            <Form.Item className="formItem">
                <Button className="button" htmlType="submit">Siguiente</Button>
                <Link to={routes.FORGOT_PASSWORD}>
                    <p style={{ fontSize: 9.5, color: '#F25270', textAlign: 'center', marginTop: "0.5rem" }}>¿Olvidaste tu contraseña?</p>
                </Link>
            </Form.Item>
            <Form.Item className="formItem">
                <Link to={routes.SIGN_UP}>
                    <h3 className="createAccount">Crear cuenta</h3>
                </Link>
            </Form.Item>
        </Form>
    )
}

export default LoginForm