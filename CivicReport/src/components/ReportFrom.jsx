import React, { useEffect, useState } from 'react'
import FormStyle from './ReportFrom.module.css'
import { toast } from 'react-toastify'
import axios from 'axios'

function ReportFrom({closeModel}) {
    const [ExUser,setExUser]=useState([])
    const [RepFormData,setRepFormData]=useState({
            fname:'',
            Phone:'',
            place:'',
            address:'',
            pin:'',
            pstation:'',
            problemT:'',
            problemD:'',
            
    })

    useEffect(()=>{
            const checkLogin=async()=>{
                    try{
                            const res=await axios.get('http://localhost:4000/api/profile',{withCredentials:true})
                            setExUser(res.data)
                            setRepFormData(prev=>({
                                ...prev,
                                fname:res.data.name,
                                Phone:res.data.phone
                            }))
                    }catch(err){
                        toast.error(err.message||"Something went wrong")
                    }
            }
    
            checkLogin()
        },[])

    const handleChange=(e)=>{
        const {name,value}=e.target

        setRepFormData({...RepFormData,[name]:value})
    }

    
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)

        if(files.length > 2){
            toast.error("Only 2 images allowed")
            e.target.value = ""
            return
        }

        for(let file of files){
            if(file.type !== "image/jpeg" && file.type !== "image/png"){
                toast.error("Only JPG or PNG images allowed")
                e.target.value = ""
                return
            }

        }
        setRepFormData({
            ...RepFormData,
            photo:files
        })

        console.log(files)
    }


    const handleSubmit=async(e)=>{
            e.preventDefault();
            if(!RepFormData.place || !RepFormData.problemT){
                toast.error("Please fill required fields")
                return
            }
            try{
                 const formData = new FormData();

                    formData.append("fname", RepFormData.fname);
                    formData.append("Phone", RepFormData.Phone);
                    formData.append("place", RepFormData.place);
                    formData.append("address", RepFormData.address);
                    formData.append("pin", RepFormData.pin);
                    formData.append("pstation", RepFormData.pstation);
                    formData.append("problemT", RepFormData.problemT);
                    formData.append("problemD", RepFormData.problemD);

                    // append images
                    if(RepFormData.photo){
                        RepFormData.photo.forEach(file=>{
                            formData.append("photos", file)
                        })
                    }
                    const res=await axios.post('http://localhost:4000/op/subForm',formData,{
                        headers:{"Content-Type": "multipart/form-data"},
                    });
                     toast.success("Report submitted successfully");
                     window.location.reload()
                    console.log(res.data);
                    
            }catch(err){
                    console.error(err);
                    
            }

    }
  return (
    <div>
        <div className={FormStyle.FormContainer}>
            <button className={FormStyle.CloseWindow} onClick={closeModel}>
                        X
                    </button>
            <div className={FormStyle.FormFields}>
                <div className={FormStyle.DefaultSec}>
                    <input type="text" name="fname" id="" value={ExUser.name} disabled onChange={handleChange}/>
                    <input type="text" name="Phone" id="" value={ExUser.phone}  disabled onChange={handleChange}/>
                </div>
                <div className={FormStyle.otherInfo}>
                    <input type="text" name="place" id=""  placeholder='Place (Required)'onChange={handleChange} required/>
                    <textarea type="text" name="address" id=""  placeholder='Address (Required)' onChange={handleChange} required/>
                    <input type="text" name="pin" id=""  placeholder='Pin (Required)' maxLength="6" pattern="[0-9]{6}" onChange={handleChange} required/>
                    <input type="text" name="pstation" id=""  placeholder='Near Police Station' onChange={handleChange} required/>
                </div>
                <div className={FormStyle.ProblemSec}>
                    <input type="text" name="problemT" id=""  placeholder='Problem Titile (Required)' onChange={handleChange} required/>
                    <textarea type="text" name="problemD" id=""  placeholder='Problem Description (eg: road thakarnnu kidakkunnu / റോഡ് തകർന്നു കിടക്കുന്നു)  (Required)' onChange={handleChange} required/>
                    <input type="file" name="photos" id=""  placeholder='Photo (Required)' multiple accept='.jpg,.jpeg,.png' onChange={handleFileChange} required/>
                </div>
                <div className={FormStyle.ButtonSec}>
                    <button onClick={handleSubmit}>Submit</button>
                    <p>Carefully fill the form.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReportFrom