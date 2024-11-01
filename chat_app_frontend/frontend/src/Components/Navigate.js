import React from "react";
import { Link } from 'react-router-dom';

function Navigate(){
    return(
        <>
            <Link to="/register">Register</Link>
            <br></br>
            <Link to="/login">Login</Link>
            <br></br>
            <Link to="/chat">Chat Area</Link>
        </>
    )
}
export default Navigate;