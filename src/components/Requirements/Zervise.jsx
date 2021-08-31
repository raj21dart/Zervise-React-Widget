import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
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

    const socket = io(apiBase)


    const authenticate = async () =>
    {

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
      if(data) setResultantData(data)
      // console.log('resultantData', resultantData)
      if(data)setAuthenticated(true)
      // console.log(data)
      // console.log('authenticated', authenticated);
      if(authenticated) getAgents()
    }
      
      
    const getAgents = async () =>
    {
      const { data } = await axios({
        method : 'GET',
        url : `${apiBase}/person/clientId/${resultantData.person.clientId}`,
        headers : {
          'auth-token': resultantData.token,
          clientId: resultantData.person.clientId,
        }
      })
      
      // console.log(data)
      setAgent(data)
      setFetchedAgent(true)
      // console.log(agent)
    }
      

    if(authenticated) console.log('resultantData', resultantData)
    if(authenticated) console.log('authenticated', authenticated);
    if(fetchedAgent) console.log('Agents', agent)
    
    useEffect(() => {
        authenticate();
    }, [authenticated])

    return (
        <div style={{visibility : authenticated ? 'visible' : 'hidden'}}>
            {
                clicked ? <Requirements socket={socket} subdomain={subdomain} agent={agent} apiBase={apiBase} result={resultantData} token={resultantData.token} setClick={setClicked}/> : <Support setClick={setClicked} />
            }
        </div>
    )
}

export default Zervise
