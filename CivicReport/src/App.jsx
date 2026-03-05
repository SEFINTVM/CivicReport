import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import AdminPanel from './pages/AdminPanel'
import AdminComplaints from './components/AdminComplaints'
import AdminAnalytics from './components/AdminAnalytics'
import AdminUsers from './components/AdminUsers'
import AdminDash from './components/AdminDash'



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
        <Route path='/Admin' element={<AdminPanel/>}>
              <Route path='complaints' element={<AdminComplaints/>}></Route>
              <Route path='analytics' element={<AdminAnalytics/>}></Route>
              <Route path='users' element={<AdminUsers/>}></Route>
        </Route>

        
        
      </Routes>
      
    </>
  )
}

export default App
