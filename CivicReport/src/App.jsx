import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home/> */}
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
          style={{ zIndex: 9999 }}
          className='Toastify__toast-container'
      />

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        
      </Routes>
      
    </>
  )
}

export default App
