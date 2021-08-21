import React from 'react'
import { Input, Form, Button } from 'antd'
import { Link } from 'react-router-dom';
import './Login.css';
import routes from '../../shared/routes';

const ForgotPasswordForm = () => {
    return (
        <Form name="forgotPassword" layout="vertical">
            <h1 className="createAccount">Recupera tu cuenta</h1>
            <Form.Item className="formItem" rules={{ required: true, message: `Ingresa tu correo electrónico` }}>
                <p style={{ fontSize: 14, textAlign: 'center' }}>
                    Ingresa tu correo electrónico para recibir tu nueva contraseña
                </p>
                <Input className="input" placeholder='medico@gmail.com'></Input>
            </Form.Item>
            <Form.Item className="formItem">
                <Button className="button" htmlType='submit'>Siguiente</Button>
            </Form.Item>
            <Form.Item className="formItem">
                <Link to={routes.LOGIN}>
                    <h3 className="createAccount">Cancelar</h3>
                </Link>
            </Form.Item>
        </Form>
    )
}

export default ForgotPasswordForm
