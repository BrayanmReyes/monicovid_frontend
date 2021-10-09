import React, { useEffect, useState } from 'react'
import { Table, Input, Button, Select, Modal, message } from 'antd';
import Column from 'antd/lib/table/Column';
import { SearchOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';
import styles from './Patients.module.css'
import MedicalService from '../../services/MedicalService';

const SearchPatients = () => {
    const { Option } = Select;

    const [searchedColumn, setSearchedColumn] = useState('name');
    const [patients, setPatients] = useState([]);
    const [assignedPatients, setAssignedPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [assignPatientModal, setAssignPatientModal] = useState(false);
    const [forBeAssigned, setForBeAssigned] = useState(null);

    const [loading, setLoading] = useState(false);

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    useEffect(() => {
        if (!loading) {
            UserService.getPatients().then((response) => {
                if (response.status === 200) {
                    setPatients(response.data);
                    setFilteredPatients([]);
                }
                MedicalService.getPatientsByDoctorId(user.id).then((response) => {
                    setAssignedPatients(response.data);
                }).catch(() => {
                    message.error('Error del servicio.');
                })
            }).catch(() => {
                message.error('Error del servicio.');
            });
        }
    }, [ loading ]);

    const assignPatient = () => {
        setLoading(true);
        MedicalService.assignPatientsForDoctor(user.id, forBeAssigned.id).then((response) => {
            if (response.status === 201) {
                message.success("El paciente se le ha sido asignado correctamente");
                setAssignPatientModal(false);
                setLoading(false);
            } else {
                message.error("Error al asignar paciente")
            }
        }).catch(() => {
            message.error('Error del servicio.');
        });
    }

    const selectBefore = (
        <Select value={searchedColumn} defaultValue="name" style={{ width: '7rem' }} onChange={(value) => setSearchedColumn(value)}>
          <Option value="dni">DNI</Option>
          <Option value="name">Nombre</Option>
        </Select>
    );

    const comprobarAsignado = (paciente) => {
        return assignedPatients.some(a => a.id === paciente.id);
    }

    const search = (value) => {
        if (value) {
            if (searchedColumn === 'name') {
                setFilteredPatients(patients.filter(p => p.first_name.toUpperCase().includes(value.toUpperCase()) || p.last_name.toUpperCase().includes(value.toUpperCase())));
            } else {
                setFilteredPatients(patients.filter(p => p.dni.toUpperCase().includes(value.toUpperCase())));
            }
        } else {
            setFilteredPatients([]);
        }
    }

    return (
        <div style={{ width: '90%', margin: '1.5rem auto' }}>
            <div style={{ margin: '1.5rem auto' }}>
                <Input addonBefore={selectBefore} placeholder="Búsqueda de pacientes"
                    addonAfter={<SearchOutlined />} allowClear
                    onChange={(event) => search(event.target.value)}>
                </Input>
            </div>
            <Table dataSource={filteredPatients} rowKey="id" locale={{ emptyText: 'Ingrese su búsqueda para ver resultados' }}>
                <Column title="DNI" dataIndex="dni" key="dni" />
                <Column title="Nombre" dataIndex="first_name" key="first_name" />
                <Column title="Apellidos" dataIndex="last_name" key="last_name" />
                <Column title="Correo" dataIndex="email" key="email" />
                <Column title="Acciones" key="actions" render={
                    (text, patient) => (
                        <>
                            { !comprobarAsignado(patient) && 
                                <>
                                    <Button className={styles.buttonNoMargin} type="primary" onClick={() => { setAssignPatientModal(true); setForBeAssigned(patient)}}>Asignar</Button>
                                    <Modal title="¿Está seguro?" visible={assignPatientModal} onCancel={() => setAssignPatientModal(false)} onOk={() => assignPatient()} okText="Sí" cancelText="No">
                                        Este paciente se le será asignado
                                    </Modal>
                                </>
                            }
                            { comprobarAsignado(patient) && <p>Ya se encuentra asignado</p>}
                        </>
                    )
                } />
            </Table>
        </div>
    )
}

export default SearchPatients
