import React, { useEffect, useState } from 'react'
import MedicHome from './MedicHome';
import PatientHome from './PatientHome';

const Home = () => {
    const [userType, setUserType] = useState();

    useEffect(() => {
        const userInfo = sessionStorage.getItem('userInfo');
        const user = JSON.parse(userInfo);
        setUserType(user.type);
    }, []);

    return userType === 'patient' ? (
        <PatientHome></PatientHome>
    ) : (
        <MedicHome></MedicHome>
    )
}

export default Home
