import React, { useContext, useState, useEffect } from "react";
import TodoInputForm, { todoListContext } from "./TodoInputForm";
import { credentialsContext } from "../App";
import "./TodoDisplayComponent.css"
import { renderTodoDisplayComponentContext } from "../pages/Dashboard";

function TodoDisplayComponent() {
  const [todoList, setTodoList] = useState([]);
  // const [todoList, setTodoList] = useContext(todoListContext);
  const [renderTodoDisplay, setRenderTodoDisplay] = useContext(renderTodoDisplayComponentContext);
  const [credentials] = useContext(credentialsContext);


  useEffect(() => {
    setRenderTodoDisplay(false);
    fetch("http://localhost:4000/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${credentials.userName}:${credentials.password}`
      }
    })
    .then((response) => response.json())
    .then(findUserAndTodoList => setTodoList(findUserAndTodoList))
  }, [renderTodoDisplay]);


  const todo_postToServer = (newTodoList) => {
    fetch("http://localhost:4000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.userName}:${credentials.password}`,
      },
      body: JSON.stringify(newTodoList),
    }).then(() => {});
  };

  const handleTaskStatus = (index, isDone) => {
    const todos = todoList;
    if (isDone) {
      todos[index - 1].taskDoneStatus = !todos[index - 1].taskDoneStatus;  
    } 
    else {
      todos[index - 1].taskDropStatus = !todoList[index - 1].taskDropStatus;
    }
    setTodoList([...todos]);
    todo_postToServer(todos);
  };


  const handleMilestoneDoneStatus = (todoId, milestoneId) => {
    const todos = todoList;
    const todo = todos[todoId - 1];
    todo.milestones[milestoneId - 1].milestoneStatus =
      !todo.milestones[milestoneId - 1].milestoneStatus;
    todos[todoId - 1] = todo;
    // if all the milestone is achieved, task is done
    let taskDoneStatus = true;
    // let n = todo.mile
    while(todo.milestones.milestoneStatus == false){taskDoneStatus = false;}
    if(taskDoneStatus) handleTaskStatus(todoId, 1);
    setTodoList([...todos]);
    todo_postToServer(todos);
  };
  const [isActiveMilestone, setIsActiveMilestone] = useState(false); 

  return (
    <>
      <h3 className="displayTitle">My Tasks</h3>

      <ul>
        {todoList?.map((item, i) => (
          <div>
            {item.taskDoneStatus == 1 && (
              <li className="done" key={i}>
                {item.todoId} &nbsp;&nbsp; {item.category} &nbsp;&nbsp;{" "}
                {new Date(item.dueDate).toLocaleDateString()} &nbsp;&nbsp;{" "}
                {item.task}
                <h3>STATUS: done</h3>
              </li>
            )}

            {item.taskDropStatus == 1 && (
              <li className="drop" key={i}>
                {item.todoId} &nbsp;&nbsp; {item.category} &nbsp;&nbsp;{" "}
                {new Date(item.dueDate).toLocaleDateString()} &nbsp;&nbsp;{" "}
                {item.task}
                <h3>STATUS: drop</h3>
              </li>
            )}

            {item.taskDoneStatus == 0 && item.taskDropStatus == 0 && (
              <li className="none" key={i}>
                {item.todoId} &nbsp;&nbsp; {item.category} &nbsp;&nbsp;{" "}
                {new Date(item.dueDate).toLocaleDateString()} &nbsp;&nbsp;{" "}
                {item.task}
                {/* :::TODO:::
                 -- ADD A MUI - {https://mui.com/material-ui/react-stepper/#vertical-stepper} --- will use timeline....
                create a button Milestonesand onclick it display it using mui stepper and beside it display the progress... mui */}
                <h3>STATUS: none</h3>
                {/* 1 for done and 0 for drop */}
                {/* if there is any milestone, taskDoneStatus will be true only when all the milestone are completed */}
                
                <button onClick={() => (setIsActiveMilestone(!isActiveMilestone))}>--Milestones Checklists--</button>
                {isActiveMilestone && item.milestones[0] && (
                  <div>
                    <ul>
                      {item.milestones.map((milestone, i) => (
                        <li>
                          {milestone.milestoneText}
                          {milestone.milestoneStatus && <h5>done</h5>}
                          {!milestone.milestoneStatus && (
                            <button
                              type="button"
                              onClick={() => {
                                handleMilestoneDoneStatus(
                                  item.todoId,
                                  milestone.milestoneId
                                );
                              }}
                            >
                              &nbsp; -- ?? Achieved ??
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!item.milestones[0] && (
                  <button onClick={() => handleTaskStatus(item.todoId, 1)}>
                    Done
                  </button>
                )}
                <button onClick={() => handleTaskStatus(item.todoId, 0)}>
                  Drop
                </button>
              </li>
            )}
          </div>
        ))}
      </ul>
    </>
  );
}
export default TodoDisplayComponent;
