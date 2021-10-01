import React, { useEffect, useState } from 'react'
import MedicalService from '../../services/MedicalService';
import { Line } from 'react-chartjs-2';
import { message } from 'antd';

const TemperatureGraph = (userId) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        MedicalService.getTemperatureReports(userId.userId).then((response) => {
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
        }).catch(() => {
            message.error('Error del servicio.');
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
