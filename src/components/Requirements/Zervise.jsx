import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Support from './Support'
import Requirements from './Requirements'

const Zervise = ({ subdomain, name, email }) => {

    const [resultantData, setResultantData] = useState({})
    const [authenticated, setAuthenticated] = useState(false)
    const [fetchedAgent, setFetchedAgent] = useState(false)
    const [agent, setAgent] = useState({})
    const [clicked, setClicked] = useState(false);

    const appName = 'external app'
    const mobile = ''
    const apiBase = 'https://api.zervise.com'

    const authenticate = async () =>{

        const { data } = await axios({
          method: 'post',
          url: `https://api.zervise.com/auth/user/external-auth/${subdomain}`,
          data: {
            name,
            email,
            appName,
            mobile,
          }
        })
        setResultantData(data)
        setAuthenticated(true)
        // console.log(data);
    }

    const getAgents = async () =>{
        const { data } = await axios({
          method : 'GET',
          url : `${apiBase}/person/clientId/${resultantData.person.clientId}`,
          headers : {
            'auth-token': resultantData.token,
            clientId: resultantData.person.clientId,
          }
        })
    
        console.log(data)
        setAgent(data)
        setFetchedAgent(true)
        // console.log(agent)
    }

    console.log('resultantData', resultantData)
    
    useEffect(() => {
        authenticate();
        getAgents()
    }, [authenticated, fetchedAgent])

    return (
        <div style={{visibility : authenticated ? 'visible' : 'hidden'}}>
            {
                clicked ? <Requirements token={resultantData.token} setClick={setClicked}/> : <Support setClick={setClicked} />
            }
        </div>
    )
}

export default Zervise
