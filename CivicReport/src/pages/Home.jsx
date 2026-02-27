import React from 'react'
import Header from '../components/Header'
import HomeStyle from './Home.module.css'
import Emergency from '../components/Emergency'
import HowToWork from '../components/HowToWork'
import Footer from '../components/Footer'


function Home() {
  return (
   <>
        <Header/>
        <div className={HomeStyle.Body}>
            <div className={HomeStyle.WelcomePage}>
                <img src="/civicBG.png" alt="background" />

                <div className={HomeStyle.Overlay}>
                    <h3>Report Public Issues. Track Resolution.</h3>
                    <p>
                    A platform for citizens to report civic problems and monitor their
                    resolution.
                    </p>

                    <button>Report a Public Issue</button>
                </div>
            </div>
        </div>
        <Emergency/>
        <HowToWork/>
        <Footer/>
   </>
  )
}

export default Home