import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import StatStyle from './Status.module.css'
import Header from './Header'

function Status() {
    const [Complaints,setComplaints]=useState([])

    useEffect(()=>{
            const fetchCompl=async()=>{
                try {
                    const comp=await axios.get('http://localhost:4000/op/IndComplaint',{withCredentials:true})
                    setComplaints(comp.data)
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }

            fetchCompl();
    },[])
  return (
    <div>
        <Header/>
        <div className={StatStyle.CompContainer}>
                <table className={StatStyle.TableComp}>
                    <tr>
                        <th>No</th>
                        <th>Problem Title</th>
                        <th>Place</th>
                        <th>Status</th>
                    </tr>
                    
                        {Complaints.map((c,index)=>(
                            <tr key={c._id}>
                                <td>{index+1}</td>
                                <td>{c.problemT}</td>
                                <td>{c.place}</td>
                                <td>
                                    <span className={`${StatStyle.status} ${StatStyle[c.status]}`}>
                                        {c.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    
                </table>
        </div>
    </div>
  )
}

export default Status