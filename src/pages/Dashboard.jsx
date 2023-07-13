import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { credentialsContext } from "../App";
import TodoInputForm from "../components/TodoInputForm";
import TodoDisplayComponent from "../components/TodoDisplayComponent";

export const renderTodoDisplayComponentContext = React.createContext(false);
const Dashboard = () => {
  const [credentials, setCredentials] = useContext(credentialsContext);
  const [openTodoForm, setOpenTodoForm] = useState(false);
  const [renderTodoDisplay, setRenderTodoDisplay] = useState(1);

  return (
    <>
      <div className="grid grid-cols-6">
        <h4 className="col-start-1 col-span-2">
          Welcome {credentials && credentials.userName}
        </h4>
        <div className="col-start-6 gap-2 flex justify-end text-sky-400">
          {credentials && <Link to="/" onClick={() => setCredentials(null)}>Logout</Link>}
        </div>
      </div>

      <renderTodoDisplayComponentContext.Provider
        value={[renderTodoDisplay, setRenderTodoDisplay]}
      >
        <div>
          {!openTodoForm && (
            <button
              className="bg-sky-400 hover:bg-sky-800 text-white text-lg my-4 py-2 px-4 rounded"
              type="button"
              onClick={() => setOpenTodoForm(!openTodoForm)}
            >
              {" "}
              Add New Task{" "}
            </button>
          )}
          {openTodoForm && (
            <button
            className="bg-sky-400 hover:bg-sky-800 text-white text-lg my-4 py-2 px-4 rounded"
            type="button"
            onClick={() => setOpenTodoForm(!openTodoForm)}
          >
            {" "}
            Close{" "}
          </button>
          )}
          <div className="bg-sky-200">
            {openTodoForm && credentials && <TodoInputForm></TodoInputForm>}
          </div>
        </div>

        <div>
          <TodoDisplayComponent></TodoDisplayComponent>
        </div>
      </renderTodoDisplayComponentContext.Provider>
    </>
  );
};
export default Dashboard;
