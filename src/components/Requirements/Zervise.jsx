import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'

import Support from './Support'
import Requirements from './Requirements'

const Zervise = ({ subdomain, name, email, position }) => {

    const [resultantData, setResultantData] = useState({})
    const [authenticated, setAuthenticated] = useState(false)
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(true)
    const [fetchedAgent, setFetchedAgent] = useState(false)
    const [agent, setAgent] = useState({})
    const [clicked, setClicked] = useState(false);

    const appName = 'external app'
    const mobile = ''
    const apiBase = 'https://api.zervise.com'

    const socket = io(apiBase)


    const authenticate = async () =>
    {
      try {
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
        
      } catch (error) {
        console.log(error.response.status);
        setError(true)
      }
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

    const closeButton = () => {
      setVisible(false)
    }
    
    useEffect(() => {
        authenticate();
    }, [authenticated])

    return (
      <>
        <div className={ visible ? 'err_msg active' : "err_msg disable"}>
          {
            error
            ? <div className="alert alert-danger">
                <span 
                  class="closebtn" 
                  onClick={closeButton}>
                    &times;
                </span>  
                <strong>User Not Authenticated!
                <br />
                </strong> Check Subdomain and email.
              </div>
            : ''
          }
        </div>
        <div style={{visibility : authenticated ? 'visible' : 'hidden'}}>
      
            {
                clicked 
                ? 
                  <Requirements 
                    socket={socket} 
                    subdomain={subdomain} 
                    agent={agent} 
                    apiBase={apiBase} 
                    result={resultantData} 
                    token={resultantData.token} 
                    setClick={setClicked}
                    position={position}
                  /> 
                  : 
                  <Support position={position} setClick={setClicked}/>
            }
        </div>
    
    </>
    )
}

export default Zervise
