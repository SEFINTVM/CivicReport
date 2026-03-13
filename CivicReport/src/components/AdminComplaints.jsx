import axios from "axios";
import React, { useEffect, useState } from "react";
import CompStyle from "./AdminComplaints.module.css";
import { toast } from "react-toastify";

function AdminComplaints() {

    const [Reports,setReports] = useState([]);
    const [selected,setSelected] = useState(null);

    useEffect(()=>{

        const fetchReport = async()=>{

            const res = await axios.get("http://localhost:4000/op/getComplaint");
            setReports(res.data);

        }

        fetchReport();

    },[])

    const SetProgress=async(id)=>{
        try{
                const res=await axios.post("http://localhost:4000/op/SetProccess",{id},{withCredentials:true})
                toast.success('Status Updated')
                window.location.reload()
        }catch(err){
            console.error(err);
            
        }
    }

    const SetSolve=async(id)=>{
        try{
                const res=await axios.post("http://localhost:4000/op/SetSolve",{id},{withCredentials:true})
                toast.success('Status Updated')
                window.location.reload()
        }catch(err){
            console.error(err);
            
        }
    }


  return (

    <div className={CompStyle.container}>
        <h2 className={CompStyle.title}>Complaints</h2>
            <div className={CompStyle.tableWrapper}>
                <table className={CompStyle.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Problem</th>
                            <th>Date</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Reports.map((rep)=>(
                        <tr key={rep._id}>
                            <td>{rep.fname}</td>
                            <td>{rep.place}</td>
                            <td>{rep.problemT}</td>
                            <td>{new Date(rep.createdAT).toLocaleDateString()}</td>
                            <td>
                                <button
                                className={CompStyle.viewBtn}
                                onClick={()=>setSelected(rep)}
                                >
                                View
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>




{selected && (

        <div className={CompStyle.modalOverlay}>

            <div className={CompStyle.modal}>

                <button className={CompStyle.closeBtn} onClick={()=>setSelected(null)}>X</button>

                <h3>{selected.problemT}</h3>

                <p><b>Name:</b> {selected.fname}</p>
                <p><b>Phone:</b> {selected.Phone}</p>
                <p><b>Place:</b> {selected.place}</p>
                <p><b>Address:</b> {selected.address}</p>
                <p><b>Pin:</b> {selected.pin}</p>
                <p><b>Police Station:</b> {selected.pstation}</p>

                <p><b>Description:</b> {selected.problemD}</p>

                <p><b>Date:</b> {new Date(selected.createdAT).toLocaleString()}</p>


                <div className={CompStyle.images}>
                    {selected.photo.map((img,i)=>(
                        <img key={i} src={`http://localhost:4000/uploads/${img}`}alt=""/>
                    ))}
                </div>

                <div className={CompStyle.btns}>

                    {selected.status === "Pending" && (
                        <button 
                            className={CompStyle.btPro} 
                            onClick={() => SetProgress(selected._id)}>
                            InProgress
                        </button>
                    )}

                    {selected.status === "InProgress" && (
                        <button 
                            className={CompStyle.btSol} 
                            onClick={() => SetSolve(selected._id)}>
                            Solve
                        </button>
                    )}

                    {selected.status === "Solved" && (
                        <button className={CompStyle.btSol}>Solved</button>
                    )}

                </div>
            </div>
        </div>
)}

    </div>

  );
}

export default AdminComplaints;