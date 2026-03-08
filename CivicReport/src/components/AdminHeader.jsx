import React, { useEffect, useState } from 'react'
import { FaBell } from "react-icons/fa";
import AdHeadStyle from './AdminHeader.module.css'
import axios from 'axios'


function AdminHeader() {
    const [compl,setCompl]=useState([])
    useEffect(()=>{
        const fetchComplaints=async()=>{
            try{
                const res=await axios.get('http://localhost:4000/op/getComplaint')
                setCompl(res.data)

            }catch(err){
                    console.log(err);
                    
            }
        }
        fetchComplaints();
    })
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
               
                <div className={AdHeadStyle.bellContainer}>
                    <FaBell className={AdHeadStyle.bell} />
                    <span className={AdHeadStyle.badge}>{compl.length}</span>
                </div>
                
               
            </div>
           
        </header>
    </div>
  )
}

export default AdminHeader