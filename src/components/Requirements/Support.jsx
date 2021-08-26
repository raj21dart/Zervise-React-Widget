import React, { useState } from 'react'
import '../../style.css';

import FaqIcon from '../Icons/information.png'


const Support = ({ setClick }) => {

    const handleClick = (e) => {
        e.preventDefault()
        setClick(true);
    }

    return (
        <div className="support">
            <button onClick={handleClick} className="zervise-support">
             
             <img src={FaqIcon} alt=""/>

             &nbsp;&nbsp;
             Need support
            </button>
        </div>
    )
}

  
export default Support
