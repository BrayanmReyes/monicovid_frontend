import React, { useEffect, useState } from 'react'
import UserService from '../../services/UserService';
import MedicHome from './MedicHome';
import PatientHome from './PatientHome';

const Home = () => {
    const [userType, setUserType] = useState();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            UserService.getUser(userId).then((response) => {
                setUserType(response.data.type);
            });
        }
    }, []);

    return userType === 'patient' ? (
        <PatientHome></PatientHome>
    ) : (
        <MedicHome></MedicHome>
    )
}

export default Home
