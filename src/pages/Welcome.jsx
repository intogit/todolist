import React, { useContext } from "react";
import {Link } from "react-router-dom"
import { credentialsContext } from "../App";
import TodoInputForm from "../components/TodoInputForm"
 
function Welcome () {
    const [credentials] = useContext(credentialsContext)
    return(
        <>
        <h1>Welcome {credentials && credentials.username}</h1>
        {!credentials && <Link to="/register">Register</Link>}
        <br />
        {!credentials && <Link to="/login">Login</Link>}
        {credentials && <TodoInputForm></TodoInputForm>}
        </>
        
    )
}

export default Welcome;