import React from 'react'
import FooterStyle from './Footer.module.css'

function Footer() {
  return (
    <div>
        <div className={FooterStyle.FootContainer}>
            <p>CivicReport is a prototype platform for public issue reporting. Not an official government app</p>
            <div className={FooterStyle.FootBtns}>
                <a href="">About</a>
                <span>|</span>
                <a href="">Contact Us</a>
            </div>
        </div>
    </div>
  )
}

export default Footer