import React, { useEffect, useState } from 'react'
import { Table, Input, Button, Space, Modal, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';
import styles from './Patients.module.css'
import MedicalService from '../../services/MedicalService';
import { useHistory } from 'react-router';
import routes from '../../shared/routes';

const SearchPatients = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [patients, setPatients] = useState('');
    const [assignPatientModal, setAssignPatientModal] = useState(false);

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    const history = useHistory();

    useEffect(() => {
        UserService.getPatients().then((response) => {
            if (response.status === 200) {
                setPatients(response.data);
            }
        });
    }, []);

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { setSearchText(node) }}
                    placeholder={`Buscar por ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                    >Buscar</Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small">Borrar</Button>
                </Space>
            </div>
        },
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchText, 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? ( text.toString() ) : ( text ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const assignPatient = (patientId) => {
        MedicalService.assignPatientsForDoctor(user.id, patientId).then((response) => {
            if (response.status === 201) {
                message.success("El paciente se le ha sido asignado correctamente");
                setAssignPatientModal(false);
                history.push(routes.PATIENTS);
            } else {
                message.error("Error al asignar paciente")
            }
        });
    }

    const columns = [
        {
            title: 'DNI',
            dataIndex: 'dni',
            key: 'dni',
            ...getColumnSearchProps('dni'),
        },
        {
            title: 'Nombre',
            dataIndex: 'first_name',
            key: 'first_name',
            ...getColumnSearchProps('first_name'),
        },
        {
            title: 'Apellidos',
            dataIndex: 'last_name',
            key: 'last_name',
            ...getColumnSearchProps('last_name'),
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, patient) => (
                <>
                    <Button className={styles.buttonNoMargin} type="primary" onClick={() => setAssignPatientModal(true)}>Asignar</Button>
                    <Modal title="¿Está seguro?" visible={assignPatientModal} onCancel={() => setAssignPatientModal(false)} onOk={() => assignPatient(patient.id)} okText="Sí" cancelText="No">
                        Este paciente se le será asignado
                    </Modal>
                </>
            )
        }
    ];

    return (
        <div style={{ width: '90%', margin: '1.5rem auto' }}>
            <Table columns={columns} dataSource={patients} />
        </div>
    )
}

export default SearchPatients
