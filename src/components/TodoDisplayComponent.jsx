import React, { useContext, useState } from "react";
import TodoInputForm, { todoListContext } from "./TodoInputForm";

function TodoDisplayComponent() {
  const [todoList, setTodoList] = useContext(todoListContext);
  console.log("tododislaycomoemtfgfgcjvbljbjbjkbj", todoList);
  const handleTaskStatus = (index, isDone) => {
    // const idx = index - 1;
    // const beforeIdxTodo = todoList.slice(0, idx);
    // const afterIdxTodo = todoList.slice(idx + 1);
    // const idxTodo = todoList.slice(idx, idx + 1);
    const todos = todoList;
    console.log("before------==", todoList);
    // todoList[index-1].taskDoneStatus = !todoList[index-1].taskDoneStatus;
    if (isDone) {
      todos[index - 1].taskDoneStatus = !todos[index - 1].taskDoneStatus;
      // idxTodo[0].taskDoneStatus = !idxTodo[0].taskDoneStatus;
    } else {
      todos[index - 1].taskDropStatus = !todoList[index - 1].taskDropStatus;
      // idxTodo[0].taskDropStatus = !idxTodo[0].taskDropStatus;
    }
    // const newTodoList = [...beforeIdxTodo, ...idxTodo, ...afterIdxTodo];
    // console.log(todoList);
    // console.log(newTodoList);
    // setTodoList(newTodoList);
    console.log("after----------===", todoList);
    setTodoList([...todos]);
    // todo_postToServer(newTodoList);
  };

  const handleMilestoneDoneStatus = (todoId, milestoneId) => {
    const todos = todoList;
    const todo = todos[todoId - 1];
    console.log(todo);
    console.log(todos);
    todo.milestones[milestoneId - 1].milestoneStatus =
      !todo.milestones[milestoneId - 1].milestoneStatus;
    todos[todoId - 1] = todo;
    setTodoList([...todos]);
  };
  const [isActiveMilestone, setIsActiveMilestone] = useState(false); 

  return (
    <>
      <h3>List of Todo List</h3>

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
                {/* :::TODO::: -- ADD A MUI - {https://mui.com/material-ui/react-stepper/#vertical-stepper}
                create a button Milestonesand onclick it display it using mui stepper and beside it display the progress... mui */}
                <h3>STATUS: none</h3>
                {/* 1 for done and 0 for drop */}
                {/* if there is any milestone, taskDoneStatus will be true only when all the milestone are completed */}
                
                <button onClick={() => (setIsActiveMilestone(!isActiveMilestone))}>Milestones \/</button>
                {isActiveMilestone && item.milestones[0] && (
                  <div>
                    <ul>
                      {item.milestones.map((milestone, i) => (
                        <li>
                          {milestone.milestoneText}
                          {milestone.milestoneStatus && <h5>done man!</h5>}
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
                              Achieved ?
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
