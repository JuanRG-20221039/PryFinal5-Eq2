import React from 'react'
import IotNavigation from '../components/IotNavigation'
import { Outlet } from 'react-router-dom'


export default function IoTLayout() {
    return (
        <div style={{width:'100%'}}>
            <Outlet/>
        </div>
    )
}
