import React, { useContext } from "react";
import {Link } from "react-router-dom"
import { credentialsContext } from "../App";
import Todo from "../components/Todo"
 
function Welcome () {
    const [credentials] = useContext(credentialsContext)
    return(
        // <>
        // <h1>Welcome {credentials && credentials.username}</h1>
        // {!credentials && <Link to="/register">Register</Link>}
        // <br />
        // {!credentials && <Link to="/login">Login</Link>}
        // {credentials && <Todo></Todo>}
        // </>
        <Todo></Todo>
    )
}

export default Welcome;