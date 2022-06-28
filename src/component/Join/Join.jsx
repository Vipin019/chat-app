import React, { useState } from 'react'
import "./Join.css";
import { Link } from "react-router-dom";
import { AiFillWechat } from 'react-icons/ai';

let user;


const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}


const Join = () => {

    const [name, setname] = useState("");

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <AiFillWechat id='joinpage__icon'/>
                <h1>ChatApp</h1>
                <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  <button onClick={sendUser} className="joinbtn">Login In</button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }