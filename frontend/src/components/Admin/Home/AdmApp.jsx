import React, { useState } from 'react'
import './style.css'
import AdmHeader from './AdmHeader'
import AdmSidebar from './AdmSidebar'
import '../Pages/AdmPages.css'
import { Outlet } from 'react-router-dom'

const AdmApp = () => {
    const [openToggle, setOpenToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenToggle(!openToggle);
    }
    return (
        <div className='admin__body'>
            <div className='grid-container'>
                <AdmHeader OpenSidebar={OpenSidebar} />
                <AdmSidebar
                    openToggle={openToggle}
                    OpenSidebar={OpenSidebar} />
                <Outlet />
            </div>
        </div>
    )
}

export default AdmApp