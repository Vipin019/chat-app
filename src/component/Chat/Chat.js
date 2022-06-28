import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
// import { FiPhoneCall } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';

let socket;

const ENDPOINT = "https://vipinchat-app.herokuapp.com/";

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setid(socket.id);
            socket.emit('joined', { user })

        

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
        })


        socket.on('leave', (data) => {
            setMessages([...messages, data]);
        })
    })

        return (() => {
            socket.on('disconnect');
            socket.off();
        })
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        })
        return () => {
            socket.off();
        }
    }, [messages])

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>ChatApp</h2>
                    {/* <a href="/"> <FiPhoneCall id='chatPage__phonecall' /></a> */}
                    {/* onClick={(event) => !name ? event.preventDefault() : null} */}
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' && event.target.value!="" ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><IoMdSend id='inputBox__icon'/></button>
                </div>
            </div>

        </div>
    )
}

export default Chat


