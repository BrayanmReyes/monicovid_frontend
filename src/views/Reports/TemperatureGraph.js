import React, { useEffect, useState } from 'react'
import MedicalService from '../../services/MedicalService';
import { Line } from 'react-chartjs-2';

const TemperatureGraph = () => {
    const [chartData, setChartData] = useState({});

    const userInfo = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    useEffect(() => {
        MedicalService.getTemperatureReports(user.id).then((response) => {
            if (response.status === 200) {
                if (response.data.length > 0) {
                    setChartData({
                        labels: response.data.map(r => r.register_date),
                        datasets: [{
                            label: "Temperatura °C",
                            data: response.data.map(r => r.value),
                            backgroundColor: [
                                "#09ACB8",
                                "#09ACB8",
                                "#09ACB8",
                                "#09ACB8",
                                "#09ACB8"
                            ]
                        }]
                    });
                }
            }
        });
    }, []);

    return (
        <>
            <Line data={chartData} options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Gráfico de temperaturas"
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                }
            }} />
        </>
    )
}

export default TemperatureGraph
