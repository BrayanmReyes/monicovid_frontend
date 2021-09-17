import React, { useEffect, useState } from 'react'
import MedicalService from '../../services/MedicalService';
import { Line } from 'react-chartjs-2';

const OxygenGraph = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        MedicalService.getOxygenReports(userId).then((response) => {
            if (response.status === 200) {
                if (response.data.length > 0) {
                    setChartData({
                        labels: response.data.map(r => r.register_date),
                        datasets: [{
                            label: "% Saturación de oxígeno",
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
                        text: "Gráfico de saturación de oxigenación"
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

export default OxygenGraph
