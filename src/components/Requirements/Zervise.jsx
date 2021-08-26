import React, { useState } from 'react'
import Support from './Support'
import Requirements from './Requirements'

const Zervise = () => {

    const [clicked, setClicked] = useState(false);

    return (
        <div>
            {
                clicked ? <Requirements setClick={setClicked}/> : <Support setClick={setClicked} />
            }
        </div>
    )
}

export default Zervise
