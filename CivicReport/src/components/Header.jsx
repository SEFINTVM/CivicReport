import React from 'react'
import HeadStyle from './Header.module.css'

function Header() {
  return (
    <div>
        <div className={HeadStyle.Head}>
            <div className={HeadStyle.Logo}>
                <h2>Civic<span>Report</span></h2>
                <img src="/CivicReportLogo.png" alt="Logo" />
            </div>

            <div className={HeadStyle.LoginReg}>
                <a href="">Login</a>|
                <a href="">Register</a>
            </div>
        </div>
    </div>
  )
}

export default Header