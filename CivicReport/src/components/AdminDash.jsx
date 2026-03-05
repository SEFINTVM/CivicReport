import React, { useState } from 'react'
import AdDashStyle from './AdminDash.module.css'
import { FaBars } from "react-icons/fa"
import { Link, Outlet } from 'react-router-dom'


function AdminDash() {

  const [openMenu,setOpenMenu]=useState(false)

  return (
    <div className={AdDashStyle.DashContainer}>

        <div className={AdDashStyle.MobileHeader}>
            <FaBars onClick={()=>setOpenMenu(!openMenu)} className={AdDashStyle.menuIcon}/>
            <h3>Admin Panel</h3>
        </div>

        <div className={`${AdDashStyle.DashSidebar} ${openMenu ? AdDashStyle.show : ""}`}>
            <Link to="/Admin" onClick={() => setOpenMenu(false)}>Dashboard</Link>
            <Link to="/Admin/complaints" onClick={() => setOpenMenu(false)}>Complaints</Link>
            <Link to="/Admin/users" onClick={() => setOpenMenu(false)}>Users</Link>
            <Link to="/Admin/analytics" onClick={() => setOpenMenu(false)}>Analytics</Link> 
            
        </div>

        <div className={AdDashStyle.DashContent}>
           <Outlet/>
        </div>

    </div>
  )
}

export default AdminDash