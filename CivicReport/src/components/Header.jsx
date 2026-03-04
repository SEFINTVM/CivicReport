import React from 'react'
import HeadStyle from './Header.module.css'
import axios from 'axios'

function Header({openLogin,loginout,setLoginOut}) {

    const handleLoogout=async()=>{
        
       try{
                const res=await axios.post('http://localhost:4000/api/logOut',{},{withCredentials:true})
                console.log(res.data);
                setLoginOut(true)
                window.location.reload();
       }catch(err){
                console.error(err);
                
       }
        
        
    }
  return (
    <div>
        <div className={HeadStyle.Head}>
            <div className={HeadStyle.Logo}>
                <h2>Civic<span>Report</span></h2>
                <img src="/CivicReportLogo.png" alt="Logo" />
            </div>

            <div className={HeadStyle.LoginReg}>
                {loginout?<a onClick={openLogin}>Login</a>:<a onClick={handleLoogout}>Log Out</a>}
            </div>
        </div>
    </div>
  )
}

export default Header