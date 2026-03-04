import React, { useState } from 'react'
import LogStyle from './Login.module.css'
import 'react-toastify'
import { toast } from 'react-toastify'
import 'axios'
import axios from 'axios'
import 'react-loading-indicators'
import { Commet } from 'react-loading-indicators'


function Login({closeModel,setLoginOut}) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading,setLoading]=useState(false)
  const [RegForm,setRegForm]=useState({
    name:'',
    email:'',
    phone:'',
    pass:'',
    cpass:''
  })
  const [LogForm,setLogForm]=useState({
    email:'',
    pass:''
  })

  const regFormChange=(e)=>{
      setRegForm(prev=>({...prev,[e.target.name]:e.target.value}))

      console.log(RegForm);
      
  }

  const LogFormChange=(e)=>{
      setLogForm(prev=>({...prev,[e.target.name]:e.target.value}))
      console.log(LogForm);
  }



  const RegFormSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
         if (!RegForm.name || !RegForm.phone || !RegForm.email || !RegForm.pass) {
            toast.error('All fields are required');
            setLoading(false);
            return;
        }
        try{
            const response=await axios.post('http://localhost:4000/api/register',RegForm,{withCredentials:true})
            console.log(response.data);
           
              toast.success('Data Stored Successfully')
            
        }catch(err){
            console.error(err);
            const message = err.response?.data?.error ||err.response?.data?.message ||"Something went wrong";
            toast.error(message)
        }finally{
          setLoading(false)
        }
  }

  const LogFormSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);

        if(!LogForm.email || !LogForm.pass){
            toast.error('The Required fields ar eempty')
            return
        }

        try{
              const res=await axios.post('http://localhost:4000/api/login',LogForm,{withCredentials:true})
              console.log(res.data);
              toast.success('Login Success !')
              setLoginOut(false)
              closeModel();
              window.location.reload();
              
        }catch(err){
              console.error(err);
              const message = err.res?.data?.error ||err.res?.data?.message ||"Something went wrong";
              toast.error(message)
              
        }
  }


  return (
    <div className={LogStyle.Backdrop}>
      <div className={LogStyle.Container}>

        <button className={LogStyle.CloseWindow} onClick={closeModel}>
            X
        </button>

        {isLogin ? (
          <div className={LogStyle.LogForm}>
            <h2>Login</h2>

            <div className={LogStyle.FormField}>
              <input type="email" placeholder="Email" name='email' onChange={LogFormChange}/>
              <input type="password" placeholder="Password" name='pass' onChange={LogFormChange}/>
            </div>

            <div className={LogStyle.ActionField}>
              <button className={LogStyle.BlueBtn} onClick={LogFormSubmit}>Login</button>
              <p>
                Not registered?{' '}
                <span onClick={() => setIsLogin(false)}>Register</span>
              </p>
            </div>
          </div>
        ) : (
          <div className={LogStyle.RegForm}>
            <h2>Register</h2>

            <div className={LogStyle.RegField}>
              <input type="text" name='name' placeholder="Full Name" onChange={regFormChange} />
              <input type="email" name='email' placeholder="Email" onChange={regFormChange}/>
              <input type="text" name='phone' placeholder="Phone" onChange={regFormChange}/>
              <input type="password" name='pass' placeholder="Password" onChange={regFormChange} />
              <input type="password" name='cpass' placeholder="Confirm Password" onChange={regFormChange}/>
            </div>

            <div className={LogStyle.RegAction}>
              <button className={LogStyle.GreenBtn} onClick={RegFormSubmit}>{loading?<Commet color="#c9181a" size="small" text="" textColor="" />:<p>Register</p>}</button>
              <p>
                Already registered?{' '}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Login