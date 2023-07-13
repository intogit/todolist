import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { credentialsContext } from "../App";
import { FcGoogle } from "react-icons/fc";
import getGoogleOauthURL from "../utils/getGoogleOauth";
// import { ImGithub } from "react-icons/im";

function Login() {
  const [userName, setUserName] = useState("");
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
        userName,
        password,
      }),
    })
      .then(async (response) => {
        // if (response.ok){
        //   const {fullName} = await response.json();
        //   throw new Error(fullName)
        // }
        if (!response.ok) {
          const { message} = await response.json();
          throw new Error(message);
        }
        return response.json();
      })
      .then( () => {
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
      <p className="text-2xl font-bold">Log in to your account</p>
      <br></br>
      <div className="flex ">
        <div className="">
          <div onClick={getGoogleOauthURL} className="my-2 py-1 px-5 border-solid border-2 border-sky-400 rounded text-xl text-slate-700  ">
            <p className="flex items-center">
              <FcGoogle className="mr-1" /> Continue with Google
            </p>
          </div>
          <a href={getGoogleOauthURL()}> SignIn with Google</a>
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
        <form onSubmit={login}>
          <div className="my-2 px-1 border-solid border-2 border-sky-400 rounded">
            <p className="text-sm">Email</p>
            <input
              className="py-1"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your email"
            ></input>
          </div>
          <div className="my-2 px-1 border-solid border-2 border-sky-400 rounded">
            <label className="text-sm">Password</label>
            <br></br>
            <input
              className="py-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            ></input>
          </div>
          <button
            className="w-full bg-sky-400 hover:bg-sky-800 text-white text-lg py-2 px-4 rounded"
            type="submit"
          >
            {" "}
            Log in{" "}
          </button>
          <div>
            <Link
              to={"/forgotpassword"}
              className="text-xs underline text-slate-500"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
      <p className="py-2 my-4">
        Don't have an account?{" "}
        <Link to="/signup" className="underline text-sky-400">
          Sign up
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
