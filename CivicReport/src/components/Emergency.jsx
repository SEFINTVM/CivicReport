import React from 'react'
import { PiSiren } from "react-icons/pi";
import { IoCall } from "react-icons/io5";
import EmStyle from './Emergency.module.css'
import { PiFireTruckFill } from "react-icons/pi";

function Emergency() {
  return (
    <div>
        <div className={EmStyle.EmBody}>
            <div className={EmStyle.EmBtns}>
                <button>
                    <PiSiren/>
                    <div className={EmStyle.EmPolBtnTxt}>
                        <h3>Police Helpline</h3>
                        <p>Call Now</p>
                    </div>
                    <IoCall/>
                </button>

                <button>
                    <PiFireTruckFill/>
                    <div className={EmStyle.EmPolBtnTxt}>
                        <h3>Fire Force Helpline</h3>
                        <p>Call Now</p>
                    </div>
                    <IoCall/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Emergency