import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { credentialsContext } from "../App";
import TodoInputForm from "../components/TodoInputForm";

function Welcome() {
  const [credentials, setCredentials] = useContext(credentialsContext);
  return (
    <>
      <div className="grid grid-cols-6">
        <h4 className="col-start-1 col-span-2">
          Welcome {credentials && credentials.userName}
        </h4>
        <div className="col-start-6 gap-2 flex justify-end text-sky-400">
          {!credentials && <Link to="/signup">Sign up</Link>}
          {!credentials && <Link to="/login">Login</Link>}
          {credentials && <Link to="/" onClick={() => setCredentials(null)}>newLogoutB</Link>}
        </div>
      </div>
      <br></br>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black-300">
          Organize your work and life, finally.
        </h1>
        <br></br>
        <h2 className="text-2xl ">
          Become focused, organized, and calm with SageList. The world’s #1 task
          manager and to-do list app.
        </h2>
        <br></br>
        <Link
          to="/login"
          className="p-2 rounded text-grey-100 font-bold bg-sky-400 hover:text-white"
        >
          Start for free
        </Link>
      </div>

      {/* {credentials && <TodoInputForm></TodoInputForm>} */}
      {/* <TodoInputForm></TodoInputForm> */}
    </>
  );
}

export default Welcome;
