import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HomeStyle from './Home.module.css'
import Emergency from '../components/Emergency'
import HowToWork from '../components/HowToWork'
import Footer from '../components/Footer'
import Login from '../components/Login'
import { toast } from 'react-toastify'
import axios from 'axios'


function Home() {
    const [ShowLogBox,setShowLogBox]=useState(false)
    const [loginout,setLoginOut]=useState(true)

    useEffect(()=>{
        const checkLogin=async()=>{
                try{
                        const res=await axios.get('http://localhost:4000/api/profile',{withCredentials:true})
                        setLoginOut(false)
                }catch(err){
                    setLoginOut(true)
                }
        }

        checkLogin()
    },[])

    const openForm=(e)=>{
        e.preventDefault()
        if(loginout){
            toast.info('Please login and after use form')
            setShowLogBox(true)
        }else{
            toast.info('well')
        }
    }

  return (
   <>
        <Header openLogin={()=>setShowLogBox(!ShowLogBox)} loginout={loginout} setLoginOut={setLoginOut}/>
        <div className={HomeStyle.Body}>
            <div className={HomeStyle.WelcomePage}>
                <img src="/civicBG.png" alt="background" />

                <div className={HomeStyle.Overlay}>
                    <h3>Report Public Issues. Track Resolution.</h3>
                    <p>
                    A platform for citizens to report civic problems and monitor their
                    resolution.
                    </p>

                    <button onClick={openForm}>Report a Public Issue</button>
                </div>
                
            </div>
            
            
        </div>
        <Emergency loginout={loginout}/>
        <HowToWork/>
        <Footer/>

        {ShowLogBox&& <Login closeModel={()=>setShowLogBox(!ShowLogBox)} setLoginOut={setLoginOut}/>}

        
   </>
  )
}

export default Home