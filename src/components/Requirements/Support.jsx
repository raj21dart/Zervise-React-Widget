import React, { useState } from 'react'
import '../../style.css';

import FaqIcon from '../Icons/information.png'


const Support = ({ setClick, position }) => {

    const handleClick = (e) => {
        e.preventDefault()
        setClick(true);
    }

    return (
        // <div style={{position: 'relative'}}>
            <div className={`support ${position}`}>
                <button onClick={handleClick} className="zervise-support">
                
                <img src={FaqIcon}/>

                &nbsp;&nbsp;
                Need support
                </button>
            </div>
        // </div>
    )
}

  
export default Support
