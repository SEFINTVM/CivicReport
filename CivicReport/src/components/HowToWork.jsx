import React from 'react'
import HowStyle from './HowToWork.module.css'
import { BsFillCameraFill } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { CgSearchFound } from "react-icons/cg";

function HowToWork() {
  return (
    <div>
        <div className={HowStyle.HowContainer}>
            <h3>How It Works</h3>

            <div className={HowStyle.Steps}>
                <div className={HowStyle.first}>
                    <BsFillCameraFill/>
                    <p><span>1</span> Submit the issue with photos</p>
                </div>
                <div className={HowStyle.second}>
                    <TbReport/>
                    <p><span>2</span>Authorities review the reports</p>
                </div>
                <div className={HowStyle.third}>
                    <CgSearchFound/>
                    <p><span>3</span>Track the status of your complaints</p>
                </div>
            </div>
            <span></span>

               
        </div>
    </div>
  )
}

export default HowToWork