// import express  from "express";
// import { response } from "express";
import React, { useContext } from "react";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { credentialsContext } from "../App";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigateTo = useNavigate();
  const [, setCredentialsState] = useContext(credentialsContext);
  
  const login = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then(async (response) => {
      if(!response.ok){
        const {message} = await response.json();
        throw new Error(message);
      }
      return response.json();
    })
    .then(() => {
      setCredentialsState({
        username,
        password,
      })
      navigateTo("/");
    })
    .catch((error) => {
      setIsError(true);
      // console.log('error-msg ' + error.message);
      setErrorMsg(error.message);
    })
  };

  return (
    <div>
      <h2>Existing user ?? </h2>
      {isError && <h5 style={{color:"red"}} >{errorMsg}</h5>}
      <form onSubmit={login}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        ></input>
        <br></br>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></input>
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
