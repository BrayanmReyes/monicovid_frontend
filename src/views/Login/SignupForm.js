import React from 'react'
import { Input, Form, Button, Col, Row, Switch, message } from 'antd'
import styles from './Login.module.css';
import { Link, useHistory } from 'react-router-dom';
import routes from '../../shared/routes';
import { defaultRules, emailRules, passwordRules, dniRules } from '../../utils/rules';
import AuthenticationService from '../../services/AuthenticationService';

const SignupForm = () => {
    const [checked, setChecked] = React.useState(true);

    const history = useHistory();

    const submit = (values) => {
        if (values.password === values.confirmation) {
            const type = checked ? 'doctor' : 'patient';
            AuthenticationService.signUp(type, values).then((response) => {
                if (response.status === 201) {
                    message.success('¡El usuario se ha registrado correctamente!');
                    history.push(routes.LOGIN);
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
        <Form name="signup" layout="vertical" onFinish={submit} onFinishFailed={failedSubmit}>
            <Form.Item className={styles.formItem}>
                <Row>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                        <p>Tipo de usuario</p>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Switch checkedChildren="Médico" unCheckedChildren="Paciente" checked={checked} onChange={setChecked}></Switch>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item className={styles.formItem} label="DNI">
                <Form.Item name="dni" noStyle rules={dniRules(true)}>
                    <Input className={styles.input} maxLength="8" placeholder='98765432'></Input>
                </Form.Item>
                <p style={{ fontSize: 9.5 }}>Nunca compartiremos su DNI con nadie más.</p>
            </Form.Item>
            <Row className={styles.formItemCols}>
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
            <Form.Item className={styles.formItem} label="Correo electrónico">
                <Form.Item name="email" noStyle rules={emailRules(true)}>
                    <Input className={styles.input} placeholder='medico@gmail.com'></Input>
                </Form.Item>
                <p style={{ fontSize: 9.5 }}>Nunca compartiremos su correo con nadie más.</p>
            </Form.Item>
            <Row className={styles.formItemCols}>
                <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                    <Form.Item label="Contraseña" name="password" rules={passwordRules(true)}>
                        <Input.Password className={styles.input} placeholder='••••••••'></Input.Password>
                    </Form.Item>
                </Col>
                <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
                <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                    <Form.Item label="Confirmación" name="confirmation" rules={passwordRules(true)}>
                        <Input.Password className={styles.input} placeholder='••••••••'></Input.Password>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item className={styles.formItem}>
                <Button className={styles.button} htmlType="submit">Siguiente</Button>
            </Form.Item>
            <Form.Item className={styles.formItem}>
                <Link to={routes.LOGIN}>
                    <h3 className={styles.createAccount}>Cancelar</h3>
                </Link>
            </Form.Item>
        </Form>
    )
}

export default SignupForm
