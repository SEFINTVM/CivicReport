import React from 'react'
import { FaBell } from "react-icons/fa";
import AdHeadStyle from './AdminHeader.module.css'

function AdminHeader() {
  return (
    <div>
        <header className={AdHeadStyle.Head}>
            <div className={AdHeadStyle.Logo}>
                <h2>Civic<span>Report</span></h2>
                <img src="/CivicReportLogo.png" alt="Logo" />
            </div>

            <div className={AdHeadStyle.Info}>
                <p className={AdHeadStyle.adminName}>Admin Name</p>
                <a href="#" className={AdHeadStyle.logout}>Logout</a>
                <FaBell className={AdHeadStyle.bell}/>
            </div>
           
        </header>
    </div>
  )
}

export default AdminHeader