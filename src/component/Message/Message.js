import React from 'react'
import "./Message.css";


const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}  >
                <small className='userName' >{user}</small>
                <p className='userMessage'>{message}</p>
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}  >
                <p className='userMessage'>{message}</p>
            </div>
        )
    }
}

export default Message
