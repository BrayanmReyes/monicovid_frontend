import { Col, Row, Card } from 'antd'
import React from 'react'
import LoginForm from './LoginForm'
import './Login.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../../shared/routes';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignupForm from './SignupForm';

const Login = () => {
    return (
        <>
            <Row>
                <Col xs={0} sm={0} md={12} lg={15} xl={15}>
                    <div className="imgLogin">
                        <img className="logoLeft" src="/assets/images/medical.svg" alt="Two doctors and patient"></img>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={9} xl={9}>
                    <div className="login">
                    <Card className="form">
                        <img className="logo" src="/icon_96.png" alt="Monicovid logo"></img>
                        <BrowserRouter>
                            <Switch>
                                <Route path={routes.LOGIN}>
                                    <LoginForm></LoginForm>
                                </Route>
                                <Route path={routes.SIGN_UP}>
                                    <SignupForm></SignupForm>
                                </Route>
                                <Route path={routes.FORGOT_PASSWORD}>
                                    <ForgotPasswordForm></ForgotPasswordForm>
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </Card>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Login
