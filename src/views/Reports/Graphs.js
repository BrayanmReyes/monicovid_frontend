import { Tabs } from 'antd'
import React from 'react'
import OxygenGraph from './OxygenGraph';
import TemperatureGraph from './TemperatureGraph';

const Graphs = (userId) => {
    const { TabPane } = Tabs;

    return (
        <>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Temperatura" key="1">
                    <div style={{ width: '80%', margin: 'auto' }}>
                        <TemperatureGraph userId={userId.userId}></TemperatureGraph>
                    </div>
                </TabPane>
                <TabPane tab="Saturación de Oxígeno" key="2">
                    <div style={{ width: '80%', margin: 'auto' }}>
                        <OxygenGraph userId={userId.userId}></OxygenGraph>
                    </div>
                </TabPane>
            </Tabs>
        </>
    )
}

export default Graphs
