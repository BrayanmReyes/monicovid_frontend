import { Space, Table, Button, Input, Modal, Form, message, Popconfirm } from 'antd';
import Column from 'antd/lib/table/Column';
import { React, useEffect, useState } from 'react'
import UserService from '../../services/UserService';
import { PlusSquareOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { defaultRules, emailRules, phoneRules } from '../../utils/rules';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);

    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    useEffect(() => {
        if (!loading) {
            UserService.getContactsByUserId(user.id).then((response) => {
                let data = response.data;
                data.forEach(f => f.visible = false);
                setContacts(data);
            })
        }
    }, [ loading ])

    const openModal = (action, contact) => {
        switch (action) {
            case 'A':
                setAddModalVisible(true);
                break;
            case 'E':
                setEditModalVisible(true);
                console.log('id', contact.id);
                editForm.setFieldsValue({
                    id: contact.id,
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone
                });
                break;
            default:
                contact.visible = true;
                break;
        }
    }

    const addContact = () => {
        setLoading(true);
        addForm.validateFields().then((values) => {
            UserService.addContactToUser(values, user.id).then((response) => {
                if (response.status === 201) {
                    addForm.resetFields();
                    message.success("Contacto creado correctamente.");
                    setLoading(false);
                    setAddModalVisible(false);
                } else {
                    setLoading(false);
                    message.warning('Error al crear contacto. Intente nuevamente.');
                }
            });
        }).catch(() => {
            message.warning("Introduzca correctamente los campos");
        });
    }

    const editContact = () => {
        setLoading(true);
        editForm.validateFields().then((values) => {
            UserService.editContact(values, values.id).then((response) => {
                if (response.status === 200) {
                    editForm.resetFields();
                    message.success("Contacto editado correctamente.");
                    setLoading(false);
                    setEditModalVisible(false);
                } else {
                    setLoading(false);
                    message.warning('Error al editar contacto. Intente nuevamente.');
                }
            });
        }).catch(() => {
            message.warning("Introduzca correctamente los campos");
        });
    }

    const deleteContact = (contactId) => {
        setLoading(true);
        UserService.deleteContact(contactId).then((response) => {
            if (response.status === 200) {
                message.success("Contacto eliminado correctamente.");
                setLoading(false);
            } else {
                setLoading(false);
                message.warning('Error al eliminar contacto. Intente nuevamente.');
            }
        }).catch(() => {
            message.warning("Error al eliminar contacto. Intente nuevamente");
        });
    }

    return (
        <>
            <div style={{ marginLeft: '5%', marginBottom: '2rem', marginTop: '2rem' }}>
                <Button style={{ backgroundColor: '#F25270', color: 'white' }} icon={<PlusSquareOutlined />} onClick={() => openModal('A')}>Añadir contacto</Button>
                <Modal title="Añadir contacto" visible={addModalVisible} onOk={() => addContact()} onCancel={() => setAddModalVisible(false)} okText="Añadir" confirmLoading={loading}>
                    <Form form={addForm} layout="horizontal" name="addContactForm">
                        <Form.Item label="Nombre" name="name" rules={defaultRules('nombre')}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Número de teléfono" name="phone" rules={phoneRules(true)}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Correo electrónico" name="email" rules={emailRules(true)}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <div style={{ width: '90%', margin: '0 auto' }}>
                <Table dataSource={contacts} rowKey="id">
                    <Column title="Nombre del contacto" dataIndex="name" key="name" />
                    <Column title="Número de teléfono" dataIndex="phone" key="phone" />
                    <Column title="Correo electrónico" dataIndex="email" key="email" />
                    <Column title="Acciones" key="actions" render={
                        (text, contact) => (
                            <Space size="middle">
                                <Button type="primary" icon={<EditOutlined />} onClick={() => openModal('E', contact)}>Editar</Button>
                                <Modal title="Editar contacto" visible={editModalVisible} onOk={() => editContact()} onCancel={() => setEditModalVisible(false)} okText="Editar" confirmLoading={loading}>
                                    <Form form={editForm} layout="horizontal" name="editContactForm">
                                        <Form.Item name="id" noStyle>
                                            <Input type="hidden" />
                                        </Form.Item>
                                        <Form.Item label="Nombre" name="name" rules={defaultRules('nombre')}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Número de teléfono" name="phone" rules={phoneRules(true)}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Correo electrónico" name="email" rules={emailRules(true)}>
                                            <Input />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                                <Popconfirm
                                    title="¿Seguro que desea eliminar este contacto?"
                                    onConfirm={() => deleteContact(contact.id)}
                                    okButtonProps={{ loading: loading }}
                                    okText="Sí"
                                    cancelText="No"
                                >
                                    <Button icon={<DeleteOutlined />} danger>Eliminar</Button>
                                </Popconfirm>
                            </Space>
                        )
                    } />
                </Table>
            </div>
        </>
    )
}

export default Contacts
