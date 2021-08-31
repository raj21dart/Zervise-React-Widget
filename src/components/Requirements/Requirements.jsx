import '../../style.css';
import React, { useState, useRef } from 'react'

import axios from 'axios';

import VisitLogo from '../Icons/external-link-alt-solid.svg';
import AddLogo from '../Icons/add.svg';
import CrossSign from '../Icons/times-solid.svg';
import CheckCircle from '../Icons/check-circle-solid.svg'
import TicketIcon from '../Icons/ticket-icon.svg'
import SyncIcon from '../Icons/sync-alt-solid.svg'
// import QestionIcon from '../Icons/question-circle-solid.svg'
import DownIcon from '../Icons/chevron-down-solid.svg'
import PaperPlabe from '../Icons/paper-plane-solid.svg'
import CloseIcon from '../Icons/close-btn.png'
import AddIcon from '../Icons/add-icon.png'
import FaqIcon from '../Icons/information.png'
import PlusIcon from '../Icons/plus.png'

import {faqData} from '../../data/faqs'
import {ticketData} from '../../data/ticket'

import Card from './Card.jsx'

const Requirements = ({ socket, subdomain, result, agent, token, apiBase, setClick }) => {

    const [className1, setClassName1] = useState(false)
    const [className2, setClassName2] = useState(true)
    const [className3, setClassName3] = useState(false)
    const [main, setMain] = useState(true)
    const [overlayExpand, setOverlayExpand] = useState(false)
    const [faqItemExpand, setFaqItemExpand] = useState(false)
    // const [faq_Id, setFaq_Id] = useState(null)
    // const [ticket_Id, setTicket_Id] = useState(null)

    // ---- Create Ticket ---
    const [ticketHeading, setTicketHeading] = useState('')
    const [ticketDescription, setTicketDescription] = useState('')
    const [ticketAttachments, setTicketAttachments] = useState({})
    const [formdata, setFormdata] = useState(null);

    const [ticketMessage, setTicketMessage] = useState([])
    const [ticketFilter, setTicketFilter] = useState(false)
    const [ticketItemExpand, setTicketItemExpand] = useState(false)
    const [update, setUpdate] = useState(false)

    const [userFaq, setUserFaq] = useState([])
    const [faqFilteredObj ,setFaqFiltereObj] = useState({})
    const [ticketObj, setTicketObj] = useState([])
    const [ticketFilteredObj, setTicketFilteredObj] = useState({})

    // Chat - message
    const [chatMessage, setChatMessage] = useState('')
    const [chatAttachment, setChatAttachment] = useState({})

    const chatDiv = useRef()

    
    socket.on('msg', (data) => {
        console.log('Line 60 Socketdata :', data)

        console.log('line 61',data.ticket.activities);

        const replyMsg = data.ticket.activities.filter((item, index) => item.type === 'reply')

        console.log(' line 83 replyMsg', replyMsg);
        setTicketMessage(replyMsg)

        chatDiv.current.addEventListener('DOMNodeInserted', (event) =>{
            const { currentTarget: target } = event
            target.scroll({ top: target.scrollHeight, behavior: 'smooth'})
        })

    })

    const getUserFaq = async () =>   {
        const { data: company } = await axios({
            method: 'get',
            url: `https://api.zervise.com/company/subdomain/${subdomain}`
        }) 

        const { data : faqs } = await axios({
            method: 'get',
            url: `https://api.zervise.com/faqs/users/${company._id}`,
        });
        setUserFaq(faqs)
        console.log('FAQs', faqs)
    }

    const faqHandleClick = async (_id) => {
        setFaqFiltereObj(userFaq.find(faq => faq._id === _id))
    }

    const getUserTickets = async () => {
        console.log('In getUserTicket token:', token);
        const { data } = await axios({
          method: 'get',
          url: `https://api.zervise.com/ticket/user`,
          headers: {
            'auth-token': token,
          },
        });

        console.log(data);
        setTicketObj(data)
        setUpdate(true)
    }
    
    const getTicketMsg = (_id) => {
        console.log('Entered into getTicketMsg');
        const ticket = ticketObj.find(ticket => ticket._id === _id)
        console.log('Line 98',ticket.activities);
        // setTicketMessage(ticket.activities);
    
        const replyMsg = ticket.activities.filter((item, index) => item.type === 'reply')

        console.log(' line 103 replyMsg', replyMsg);
        setTicketMessage(replyMsg)
    }

    const ticketHandleClick = (_id) => {
        const ticket = ticketObj.find(ticket => ticket._id === _id)
        console.log('Line 89',ticket);
        setTicketFilteredObj(ticket)
        setTicketFilter(true)
    }

    const getCreateTicketData = async (e) => 
    {
        e.preventDefault()
        console.log(ticketHeading)
        console.log(ticketDescription)
        console.log(ticketAttachments)
        // console.log(typeof(ticketAttachments))

        let formData = new FormData();
        const ticketObjAll = {
            ticketHeading,
            ticketDescription,
            clientId: result.person.clientId,
            createdPersonId: result.person._id,
            userId: result.person._id,
            source: 'Wordpress',
            ticketInfo: {
                priority: 'low',
                tags: [''],
                updatedBy: '',
                currentlyAssigned: '',
                department: '',
                service: '',
                tags: '',
            },
            ticketStatus: [
                {
                status: 'open',
                end: '',
                updatedBy: '',
                },
            ],
            activities: [
                {
                action: 'Reported via React Zervise Widget',
                message: {
                    body: ticketDescription,
                    sender: 'user',
                },
                type: 'reply',
                updatedBy: result.person._id,
                },
            ],
        };

        formData.append('ticket', JSON.stringify(ticketObjAll));


        for (let i = 0; i < ticketAttachments.length; i++) {
        formData.append('attachment', ticketAttachments[i]);
        }
        
        const { data } = await axios({
            method: 'post',
            url: `${apiBase}/ticket/create`,
            headers: {
                'auth-token': result.token,
                clientId: result.person.clientId,
            },
            data: formData
        });
        
        // console.log('CreateTicket',data)

        if(data){
            setTicketHeading('')
            setTicketDescription('')
            setTicketAttachments({})
        }
        
        

        // for (let entries of formData.entries()) {
        //   console.log(entries[1]); 
        // }
    }

    const handleChat = async (e) => {
        e.preventDefault()
        const user = agent.find(agent => agent.role === 'user' && agent._id ===  ticketFilteredObj.userId)

        // console.log(ticketFilteredObj);
        // console.log('ticketFilteredObj_id',ticketFilteredObj._id);
        // console.log(`User_ClientId : ${user[0].clientId}`)
        // console.log(`UserID : ${user[0]._id}`);
        // console.log(ticketFilteredObj)
        // console.log(ticketFilteredObj._id)
        // console.log(ticketFilteredObj.clientId)

        let formData = new FormData();
        formData.append('message', chatMessage)
        formData.append('messageType', 'reply')
        formData.append('attachment', chatAttachment)

        // for (let i = 0; i < ticketAttachments.length; i++) {
        //     formData.append('attachment', ticketAttachments[i]);
        // }

        const { data } = await axios({
            method: 'post',
            url : `https://api.zervise.com/ticket/attachment/${ticketFilteredObj._id}?clientId=${user.clientId}&updatedBy=${user._id}`,
            headers: {
              'auth-token': token,
              clientId: user.clientId,
            },
            data: formData,
        })
        console.log('Line 221',data)

        if(data){
            setChatMessage('')
            setChatAttachment({})
        }

        // const replyMsg = data.activities.filter((item, index) => item.type === 'reply')

        // console.log(' line 209 replyMsg', replyMsg);
        // setTicketMessage(replyMsg)
    }

    

    return (       
        <div className={main ? 'main' : 'main disable'}>
            
        {/* <button onClick={() => console.log(ticketData.map((ticket, key) => console.log(ticket._id)))}>click</button> */}

            <div className="zervise-container">

                {/* FAQs --- (First One) */}
                <div className={className1 ? 'first active' : 'first'}>
                    <div className="top-title">

                        <div className="title-left">
                            <img class="icon-question" src={FaqIcon} alt="" />
                            &nbsp;
                            <div>
                                FAQs
                            </div> 
                        </div>

                        <div className="btn-X">
                        <a href="" onClick={() => {
                                setMain(false)
                                setClick(false)
                            }}>
                                <img className="cross-sign" src={CloseIcon} alt=""/>
                            </a>
                        </div>

                    </div>
                    
                    {/* map over the faq data */}
                    <div className="faq-cnt">
                        {
                            userFaq.map((faq, key) => {
                                return(
                                    
                                    <div
                                        key={key} 
                                        onClick={() => {
                                            // console.log("data_id",data._id)
                                            // console.log("faq_id",faq_Id)
                                            faqHandleClick(faq._id)
                                            if (!faqItemExpand){
                                                setFaqItemExpand(true)
                                                setTicketItemExpand(false)
                                                // setFaq_Id(data._id)
                                                setOverlayExpand(true);
                                            }
                                        }}
                                        className='faq-items'
                                    >
                                
                                        <div className="faq-heading">
                                            {faq.question}
                                        </div>
                                        <div className="plus-icon">
                                            <img className="plus-icon" src={PlusIcon} alt=""/>
                                        </div>

                                        <div className="faq-dscr">
                                            {faq.answer}
                                        </div>
                                
                                    </div>
                                )
                            })
                        }
                        
                    </div>

                    
                </div>

                {/*Raise a Ticket -- (Middle One) */}
                <div className={className2 ? 'middle active' : 'middle'}>

                    {/* Top Title */}
                    <div className="top-title">
                        <div className="title-left">
                            <a className="btn-plus">
                                <img className="raise-ticket-icon" src={AddIcon} alt="" srcset="" />
                           </a> 
                            &nbsp; Raise a Ticket
                        </div>

                        &nbsp;

                        <a className="btn-X" onClick={() => {
                            setMain(false)
                            setClick(false)
                        }}>
                            <img className="cross-sign" src={CloseIcon} alt=""/>
                            
                        </a>
                    </div> 
       
                    <br></br>
                    
                    <form className="zervise-form" method="post">

                        {/* Ticket Subject */}
                        <input formTarget="_blank" name="subject" className="ticket-subject" type="text" value={ticketHeading} onChange={(e) => setTicketHeading(e.target.value)} placeholder="Enter ticket subject" required />

                        {/* Describe Issue */}
                        <textarea  rows="8" name="Issue" className="issue-description" type="text" value={ticketDescription} onChange={(e) => setTicketDescription(e.target.value)} placeholder="Describe your issue.." required />

                        {/* File Uploads */}
                        <div className="file-upload">
                            <input type="file" onChange={(e) => setTicketAttachments(e.target.files)} multiple/>
                        </div>

                        {/* Submit the ticket*/}
                        <button className="submit-ticket" type="submit" onClick={(e) => getCreateTicketData(e)}>
                            <img className="visit-logo" src={CheckCircle} alt=""/>
                            <span className="visit-text">Submit Ticket Now</span>
                            
                        </button>
                    </form>
                    
                    {/* <div className="or">OR</div>  */}

                    {/* Button Visit Zervise Site */}
                    {
                        /* <button className="visit-site" type="click">
                            <img src={VisitLogo} className="visit-logo" alt="visit-logo"/>
                            <span className="visit-text">Visit My Zervise Site</span>
                        </button> */
                    }
                </div>

                
                {/* My Ticket ---- (third One) */}
                <div className={className3 ? 'third active' : 'third'}>
                    <div className="top-title">
                        <div className="ticket-icon-txt">
                            <img src={TicketIcon} alt="" />
                            &nbsp;My Ticket
                        </div>
                        <div className="refresh-cross-icon">
                            <button className="refresh"
                                onClick={() => getUserTickets()}
                            >
                                <img className="sync-icon" src={SyncIcon} alt="" />
                                Refresh
                            </button>

                            <a href="" onClick={() => {
                                setMain(false)
                                setClick(false)
                            }}>
                                <img className="cross-sign" src={CloseIcon} alt=""/>
                            </a>
                        </div>
                    </div>       

                    <div className="ticket-cnt">
                       {
                            ticketObj.map((ticket, key) => 
                            {
                               return(
                                    <div
                                        key={key}
                                        onClick={(e) => {
                                            // setTicket_Id(ticket._id)
                                            ticketHandleClick(ticket._id)
                                            getTicketMsg(ticket._id)
                                            setFaqItemExpand(false)
                                            setTicketItemExpand(true)
                                            setOverlayExpand(true);
                                            // console.log(ticket)
                                            // console.log(typeof(ticket))
                                        }}
                                        className="ticket-item"
                                    >

                                        <div className="ticket-top">
                                            <div className="ticket-number">#{ticket.ticketNumber}</div>
                                            &nbsp; 
                                            <div className="ticket-status">
                                                {ticket.ticketStatus[ticket.ticketStatus.length - 1].status}
                                            </div>
                                        </div>

                                        <div className="ticket-bottom">
                                            <div className="ticket-dscr">
                                                {ticket.ticketHeading}
                                            </div>
                                            <div className="ticket-date">
                                                <div className="date-dtl">
                                                
                                                {new Date(
                                                        ticket.dateCreated
                                                    ).toLocaleString('en-In', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour12: true,
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                           })
                       }
                        
                    </div>

                    
                </div>


                {/* Footer */}

                {/* FAQs -------- Raise ticket ------- My Ticket*/}
                <div className="bottom-nav">
                    <button 
                        onClick={() => {
                            getUserFaq()
                            setClassName2(false)
                            setClassName3(false)
                            setClassName1(true)
                        }}
                        className={className1 ? 'bottom-nav-item btn-1 active' : 'bottom-nav-item btn-1'}>
                        FAQs
                    </button>

                    <button 
                        onClick={() => {
                            setClassName1(false)
                            setClassName3(false)
                            setClassName2(true)
                        }}
                        className={className2 ? 'bottom-nav-item btn-2 active' : 'bottom-nav-item btn-2'}>
                        Raise A Ticket
                    </button>

                    <button 
                        onClick={() => {
                            getUserTickets()
                            setClassName1(false)
                            setClassName2(false)
                            setClassName3(true)
                        }}
                        className={className3 ? 'bottom-nav-item btn-1 active' : 'bottom-nav-item btn-1'}>
                        My Ticket
                    </button>
                </div>

                <div className="powered-by" style={{textAlign: 'center'}}>
                    <span>⚡</span>
                    <p>Powered by 
                        <a target="_blank" href="https://zervise.com/" style={{cursor: 'pointer', marginLeft: '3px',color:'blue', textDecoration: 'underline'}}>Zervise</a> 
                    </p>
                </div>

                {/* Overlay */}
               <div className='overlay'>
                    <div className={overlayExpand ? "overlay-div expand" : 'overlay-div'}>

                        {/* Overlay --- FAQs */}
                        {
                            <div className={faqItemExpand ? 'faqData-overlay' : 'faqData-overlay disable'}>
                                {/* Overlay-Down-icon */}
                                <div 
                                    className="overlay-div-icon"
                                    onClick={() => {
                                        setOverlayExpand(false)
                                        setFaqItemExpand(false)
                                    }}
                                >
                                        <img src={DownIcon} alt=""/>
                                </div>

                                <div className="faq-heading" style={{margin: '15px 21px 0 5px', fontSize: '17px', fontWeight: 'bold'}}>
                                    {faqFilteredObj.question}
                                </div>
                                
                                <div className="faq-dscr-scrollable">
                                    <div className="faq-dscr">
                                        {`${faqFilteredObj.answer}`}
                                    </div>
                                </div>
                            </div> 
                        }
                        
                        {/* Overlay --- Ticket */}
                        {
                            <div className={ticketItemExpand ? 'ticketData-overlay' : 'ticketData-overlay disable'}>
                            
                                <div className="ticket-top-overlay">
                                    <div className="ticket-number-overlay">
                                        {`#${ticketFilteredObj.ticketNumber}`}
                                    </div>
                                    &nbsp; 
                                    <div className="ticket-status-overlay">
                                        { ticketFilter 
                                            ? 
                                            ticketFilteredObj.ticketStatus[ticketFilteredObj.ticketStatus.length - 1].status
                                            : ''
                                        }
                                    </div>

                                    {/* Overlay-Down-icon */}
                                    <div 
                                        className="overlay-div-icon"
                                        onClick={() => setOverlayExpand(false)}
                                    >
                                            <img src={DownIcon} alt=""/>
                                    </div>
                                </div>

                                <div className="ticket-bottom-overlay">
                                    <div className="ticket-dscr-overlay">
                                        {ticketFilteredObj.ticketHeading}
                                    </div>
                                    <div className="ticket-date-overlay">
                                        <div className="date-dtl-overlay">
                                            {new Date(
                                                ticketFilteredObj.dateCreated
                                            ).toLocaleString('en-In', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour12: true,
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }


                        {/* Duplicate ticketData-overlay */}
                       <div className={ticketItemExpand ? 'ticketData-overlay' : 'ticketData-overlay disable'}>
                            <div className="chat-cnt" ref={chatDiv}>
                            
                            {  
                                ticketMessage.map((msg, key) => {
                                    return(
                                        <>
                                         {
                                             msg.message.sender === 'user' ? 
                                                <div 
                                                    key={key}
                                                    className={msg.message.sender === 'user' ? 'message-user' : 'message-admin'}
                                                >
                                                    <div className="top-title-message">
                                                        Raj
                                                        &nbsp;
                                                        {
                                                            new Date(
                                                            msg.date
                                                            ).toLocaleString('en-In', {
                                                            /// weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour12: true,
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                            })
                                                        }
                                                    </div>
                                                    <div className="body">
                                                        <div className="message">
                                                        {   
                                                            
                                                            msg.message.body
                                                        
                                                        }
                                                        </div>
                                                        <div className={msg.message.sender === 'user' ? "ac-badge ac-badge-user" : "ac-badge ac-badge-admin"}>
                                                            R
                                                        </div>
                                                    </div>
                                                </div>
                                            :
                                            <div
                                                key={key} 
                                                className={msg.message.sender === 'user' ? 'message-user' : 'message-admin'}
                                            >
                                                <div className="top-title-message">
                                                    
                                                   {
                                                        new Date(
                                                        msg.date
                                                        ).toLocaleString('en-In', {
                                                           /// weekday: 'short',
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour12: true,
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                        })
                                                    }
                                                    &nbsp;
                                                    Rjdart
                                                </div>
                                                <div className="body">
                                                    <div className={msg.message.sender === 'user' ? "ac-badge ac-badge-user" : "ac-badge ac-badge-admin"}>
                                                        R
                                                    </div>
                                                    <div className="message">
                                                    {
                                                        msg.message.body
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        </>

                                    )
                                 })
                            }
                                
                            </div>

                                
                            {/* <button onClick={() => handleChat()}>Click Chat</button> */}

                            <form className="chat-form" method="post">
                                <textarea className="chat-reply" type="text" placeholder="Reply.." value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}/>
                                <div className="chat-submit">
                                    <input className="chat-file-upload" type="file"  onChange={(e) => setChatAttachment(e.target.files)} multiple/>
                                
                                    <button className="chat-btn" type="submit" onClick={(e) => handleChat(e)}>
                                        <img src={PaperPlabe} alt=""/>
                                    </button>
                                </div>
                            </form>
                       
                       </div>



                    </div>

               </div> 
               {/* overlay --end */}
            </div>

        </div>
    )
}


export default Requirements
