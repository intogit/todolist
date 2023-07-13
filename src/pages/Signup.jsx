// import express  from "express";
// import { response } from "express";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { credentialsContext } from "../App";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
// import validate from "deep-email-validator";


function Signup() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [privacyCheckbox, setPrivacyCheckbox] = useState(false);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigateTo = useNavigate();
  const [, setCredentialsState] = useContext(credentialsContext);

  const signup = async (e) => {
    e.preventDefault();
    // validation 
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordFormat=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/; 
    if( !userName.match(mailFormat)){
      alert("Irregular email format, try again");
      return;
    }
    // email verification
    // username is email
    // console.log("mail format is good");
    // const {emailValid} = await validate(userName);
    // console.log(emailValid);
    // if( !emailValid.valid ){
    //   alert ("email verification failed.. invalid email ==>> try again");
    //   return;
    // }
    // email validation not working....
    if( !password.match(passwordFormat)){
      alert("password length must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");
      return;
    }
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName, //email address
        password,
        fullName,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }
        return response.json();
      })
      .then(() => {
        setCredentialsState({
          userName,
          password,
        });
        navigateTo("/dashboard");
      })
      .catch((error) => {
        setIsError(true);
        // console.log('error-msg ' + error.message);
        setErrorMsg(error.message);
      });
  };

  return (
    <div>
      <p className="text-2xl font-bold">Create your account</p>
      <br></br>
      <div className="flex ">
        <div className="">
          <div className="my-2 py-1 px-5 border-solid border-2 border-sky-400 rounded text-xl text-slate-700  ">
            <p className="flex items-center">
              <FcGoogle className="mr-1" /> Continue with Google
            </p>
          </div>
          {/* <div className="my-2 py-1 px-5 border-solid border-2 border-sky-400 rounded text-xl text-slate-700 ">
            <p className="flex items-center">
              <ImGithub className="mr-1" />
              Continue with Github
            </p>
          </div> */}
        </div>
      </div>

      {isError && <h5 style={{ color: "red" }}>{errorMsg}</h5>}

      <div className="flex">
        <form onSubmit={signup}>
          <div className="my-2 px-1 border-solid border-2 border-sky-400 rounded">
            <p className="text-sm">Email</p>
            <input
              required
              className="py-1"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your email"
            ></input>
          </div>
          <div className="my-2 px-1 border-solid border-2 border-sky-400 rounded">
            <label className="text-sm">Full Name</label>
            <br></br>
            <input
              required
              className="py-1"
              type="name"
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            ></input>
          </div>
          <div className="my-2 px-1 border-solid border-2 border-sky-400 rounded">
            <label className="text-sm">Password</label>
            <br></br>
            <input
              required
              className="py-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            ></input>
          </div>
          <div className="my-3">
            <input
              required
              type="checkbox"
              value={privacyCheckbox}
              onChange={() => setPrivacyCheckbox(!privacyCheckbox)}
            />
            <span> I accept <a className="text-sky-400 underline">Privacy Policy</a> and <a className="text-sky-400 underline">Terms of service</a></span>
          </div>


          {/* implement captcha here */}

          <button
            className="my-2 w-full bg-sky-400 hover:bg-sky-800 text-white text-lg py-2 px-4 rounded"
            type="submit"
          >
            {" "}
            Sign up with email{" "}
          </button>
        </form>
      </div>
      <p className="py-2 my-4">
        Have an account?{" "}
        <Link to="/login" className="underline text-sky-400">
          Log in now
        </Link>{" "}
      </p>
    </div>
  );
}

export default Signup;
