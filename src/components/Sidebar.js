import { Button, Layout, Menu, Row, Col } from 'antd';
import { React, useState, useEffect } from 'react'
import { TeamOutlined, FileDoneOutlined, MedicineBoxOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './Sidebar.module.css';
import routes from '../shared/routes';
import { Switch, Route, useHistory } from 'react-router';
import Reports from '../views/Reportes/Reports';
import Contacts from '../views/Contacts/Contacts';
import Account from '../views/Account/Account';

const Sidebar = () => {
    const { Header, Content, Footer, Sider } = Layout;

    const [collapsed, setCollapsed] = useState(false);
    const [title, setTitle] = useState('Contactos');

    const toggle = () => { setCollapsed(!collapsed) }

    const history = useHistory();

    useEffect(() => {
        history.push(routes.CONTACTS);
    }, []);

    const keySelected = (key) => {
        history.push(key.item.props.link);
        setTitle(key.item.props.title);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider className={styles.sidebar} breakpoint="lg" collapsible trigger={null} collapsed={collapsed}>
                <Menu theme="dark" className={styles.menu} defaultSelectedKeys={['2']} mode="inline" onSelect={(key) => keySelected(key)}>
                    {/* <img src="/icon_32.png" alt="Monicovid logo"/> */}
                    <Menu.Item className={styles.item} key="1" icon={<FileDoneOutlined />} title="Reportes" link={routes.REPORTS}>
                        Reportes
                    </Menu.Item>
                    <Menu.Item className={styles.item} key="2" icon={<TeamOutlined />} title="Contactos" link={routes.CONTACTS}>
                        Contactos
                    </Menu.Item>
                    <Menu.Item className={styles.item} key="3" icon={<MedicineBoxOutlined />} title="Centros médicos">
                        Centros médicos
                    </Menu.Item>
                    <Menu.Item className={styles.item} key="4" icon={<UserOutlined />} title="Cuenta" link={routes.ACCOUNT}>
                        Cuenta
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#66D9D9', paddingLeft: '1rem', color: '#F25270' }}>
                    <Row>
                        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                            { collapsed ? <Button icon={<MenuUnfoldOutlined />} onClick={() => toggle()} />
                            : <Button icon={<MenuFoldOutlined />} onClick={() => toggle()} /> }
                        </Col>
                        <Col xs={0} sm={0} md={23} lg={23} xl={23}>
                            <div style={{ fontSize: '2rem', paddingLeft: '1.5rem' }}>
                                {title}
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    <Switch>
                        <Route path={routes.REPORTS}>
                            <Reports></Reports>
                        </Route>
                        <Route path={routes.CONTACTS}>
                            <Contacts></Contacts>
                        </Route>
                        <Route path={routes.ACCOUNT}>
                            <Account></Account>
                        </Route>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor: '#F25270', padding: '0.5rem', color: 'white' }}>Monicovid &copy; 2021</Footer>
            </Layout>
        </Layout>
    )
}

export default Sidebar
