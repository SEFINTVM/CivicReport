import React, { useState } from 'react'
import FormStyle from './ReportFrom.module.css'
import { toast } from 'react-toastify'
import axios from 'axios'

function ReportFrom({closeModel}) {
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
            if(RepFormData.length===0){
                toast.error('Please Fill the Form')
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
                    RepFormData.photo.forEach((file) => {
                        formData.append("photos", file);
                    });
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
                    <input type="text" name="fname" id=""  placeholder='FullName' onChange={handleChange}/>
                    <input type="text" name="Phone" id=""  placeholder='Phone' onChange={handleChange}/>
                </div>
                <div className={FormStyle.otherInfo}>
                    <input type="text" name="place" id=""  placeholder='Place'onChange={handleChange}/>
                    <textarea type="text" name="address" id=""  placeholder='Address' onChange={handleChange}/>
                    <input type="text" name="pin" id=""  placeholder='Pin' maxLength="6" pattern="[0-9]{6}" onChange={handleChange}/>
                    <input type="text" name="pstation" id=""  placeholder='Near Police Station' onChange={handleChange}/>
                </div>
                <div className={FormStyle.ProblemSec}>
                    <input type="text" name="problemT" id=""  placeholder='Problem Titile' onChange={handleChange}/>
                    <textarea type="text" name="problemD" id=""  placeholder='Problem Description (eg: road thakarnnu kidakkunnu / റോഡ് തകർന്നു കിടക്കുന്നു)' onChange={handleChange}/>
                    <input type="file" name="photos" id=""  placeholder='Photo' multiple accept='.jpg,.jpeg,.png' onChange={handleFileChange}/>
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