import '../../style.css';
import React, { useState, useEffect } from 'react'

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

const Requirements = ({ setClick }) => {

    const [className1, setClassName1] = useState(false)
    const [className2, setClassName2] = useState(true)
    const [className3, setClassName3] = useState(false)
    const [main, setMain] = useState(true)
    const [overlayExpand, setOverlayExpand] = useState(false)
    const [faqItemExpand, setFaqItemExpand] = useState(false)
    // const [faq_Id, setFaq_Id] = useState(null)
    // const [ticket_Id, setTicket_Id] = useState(null)

    const [ticketFilter, setTicketFilter] = useState(false)
    const [ticketItemExpand, setTicketItemExpand] = useState(false)

    const [faqFilteredObj, setFaqFilteredObj] = useState({})
    const [ticketFilteredObj, setTicketFilteredObj] = useState({})

    const faqHandleClick = (_id) => {
        setFaqFilteredObj(faqData.find(faqItem => faqItem._id === _id))
    }

    const ticketHandleClick = (_id) => {
        setTicketFilteredObj(ticketData.find(ticket => ticket._id === _id))
        setTicketFilter(true)

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
                            faqData.map((data, key) => {
                                return(
                                    
                                    <div
                                        key={key} 
                                        onClick={() => {
                                            // console.log("data_id",data._id)
                                            // console.log("faq_id",faq_Id)
                                            faqHandleClick(data._id)
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
                                            {data.question}
                                        </div>
                                        <div className="plus-icon">
                                            <img className="plus-icon" src={PlusIcon} alt=""/>
                                        </div>

                                        <div className="faq-dscr">
                                            {data.answer}
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
                    
                    <form className="zervise-form" action="https://formsubmit.co/rajsen89611@gmail.com" method="post">

                        {/* Ticket Subject */}
                        <input formTarget="_blank" name="subject" className="ticket-subject" type="text" placeholder="Enter ticket subject" required />

                        {/* Describe Issue */}
                        <textarea  rows="6" name="Issue" className="issue-description" type="text" placeholder="Describe your issue.." required />

                        {/* File Uploads */}
                        <div className="file-upload">
                            <input type="file" name="" id="" />
                        </div>

                        {/* Submit the ticket*/}
                        <button className="submit-ticket" type="submit">
                            <img className="visit-logo" src={CheckCircle} alt=""/>
                            <span className="visit-text">Submit Ticket Now</span>
                            
                        </button>
                    </form>
                    
                    {/* <div className="or">OR</div>  */}

                    {/* Button Visit Zervise Site */}
                    {/* <button className="visit-site" type="click">
                        <img src={VisitLogo} className="visit-logo" alt="visit-logo"/>
                        <span className="visit-text">Visit My Zervise Site</span>
                        
                    </button> */}
                </div>

                
                {/* My Ticket ---- (third One) */}
                <div className={className3 ? 'third active' : 'third'}>
                    <div className="top-title">
                        <div className="ticket-icon-txt">
                            <img src={TicketIcon} alt="" />
                            &nbsp;My Ticket
                        </div>
                        <div className="refresh-cross-icon">
                            {/* <button className="refresh">
                                <img className="sync-icon" src={SyncIcon} alt="" />
                                Refresh
                            </button> */}

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
                            ticketData.map((ticket, key) => 
                            {
                               return(
                                    <div
                                        key={key}
                                        onClick={(e) => {
                                            // setTicket_Id(ticket._id)
                                            ticketHandleClick(ticket._id)
                                            setFaqItemExpand(false)
                                            setTicketItemExpand(true)
                                            setOverlayExpand(true);
                                            console.log(ticket)
                                            console.log(typeof(ticket))
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

                                <div className="faq-heading" style={{margin: '15px 0 0 5px', fontSize: '17px', fontWeight: 'bold'}}>
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
                            <div className="chat-cnt">
                                
                            </div>

                            <form className="chat-form" action="" method="post" validate>
                                <textarea className="chat-reply" type="text" placeholder="Reply.." />
                                <div className="chat-submit">
                                    <input className="chat-file-upload" type="file" name="" id="" />
                                
                                    <button className="chat-btn">
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
