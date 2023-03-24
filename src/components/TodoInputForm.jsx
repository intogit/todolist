import React, { useContext, useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { credentialsContext } from "../App";
import TodoDisplayComponent from "./TodoDisplayComponent";
import "./TodoInputForm.css";

export const todoListContext = React.createContext(null);

let id_count = 0;
let milestone_count = 0;
function TodoInputForm() {
  const [todoList, setTodoList] = useState([]);
  const todoitem = todoList;
  console.log("todoitem :  " , todoitem);
  const [categoriesList, setCategoriesList] = useState([
    "long goals",
    "short goals",
    "wishlists",
  ]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [addNewCategoryStatus, setAddNewCategoryStatus] = useState(false);
  const [addNewMilestoneStatus, setAddNewMilestoneStatus] = useState(false);
  const [milestoneList, setMilestoneList] = useState([]);
  const [milestoneListStatus, setMilestoneListStatus] = useState([]);

  const [currentDate, setNewDate] = useState(null);
  const [quote, setQuote] = useState(null);

  // const [credentials] = useContext(credentialsContext);
  // const todo_postToServer = (newTodoList) => {
  //   fetch("http://localhost:4000/todo", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Basic ${credentials.username}:${credentials.password}`,
  //     },
  //     body: JSON.stringify(newTodoList),
  //   }).then(() => {});
  // };

  // useEffect(() => {
  //   fetch("http://localhost:4000/todo", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Basic ${credentials.username}:${credentials.password}`
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then(findUserAndTodoList => setTodoList(findUserAndTodoList))
  // }, [])

  // const category_postToServer = (newCategoriesList) => {
  //   fetch("http://localhost:4000/todo_categories", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Basic ${credentials.username}:${credentials.password}`,
  //     },
  //     body: JSON.stringify(newCategoriesList),
  //   }).then(() => {});
  // };
  // useEffect(() => {
  //   fetch("http://localhost:4000/todo_categories", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Basic ${credentials.username}:${credentials.password}`
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then(categoryList => setCategoriesList(categoryList))
  // }, [])

  const handleAddNewCategory = () => {
    console.log("inside handleaddnewcategory");
    const newCategory = document.getElementById("category_text").value;
    const newCategoriesList = [...categoriesList, newCategory];
    setCategoriesList([...categoriesList, newCategory]);
    document.getElementById("category_text").value = "";
    setAddNewCategoryStatus(false);
    // category_postToServer(newCategoriesList);
  };
  const handleAddNewMilestone = () => {
    console.log("inside handleaddnewmilestone");
    const milestone_text = document.getElementById("milestone_text").value;
    milestone_count = milestone_count + 1;
    const newMilestone = {
      milestoneId: milestone_count,
      milestoneText: milestone_text,
      milestoneStatus: false,
    };
    const newMilestoneList = [...milestoneList, newMilestone];
    setMilestoneList([...milestoneList, newMilestone]);
    // setMilestoneListStatus([...milestoneListStatus, false]);
    alert("Milestone added..");
    document.getElementById("milestone_text").value = "";
    document.getElementById("milestone_text").placeholder =
      "Add another Milestone";

    console.log(newMilestoneList);
    // category_postToServer(newCategoriesList);
  };

  const addNewTodo = (e) => {
    e.preventDefault();
    id_count = id_count + 1;
    console.log("in add new todo");
    const newTodo = {
      todoId: id_count,
      category: currentCategory,
      dueDate: currentDate,
      task: quote,
      taskDoneStatus: 0,
      taskDropStatus: 0,
      milestones: milestoneList,
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setCurrentCategory("");
    setNewDate(null);
    setQuote(null);
    setMilestoneList([]);
    document.getElementById("quote_text").value = "";
    console.log(newTodoList);
    milestone_count = 0;
    // console.log()
    // todo_postToServer(newTodoList);
  };

  // const handleTaskStatus = (index, isDone) => {
  //   const idx = index - 1;
  //   const beforeIdxTodo = todoList.slice(0, idx);
  //   const afterIdxTodo = todoList.slice(idx + 1);
  //   const idxTodo = todoList.slice(idx, idx + 1);

  //   if (isDone) {
  //     idxTodo[0].taskDoneStatus = !idxTodo[0].taskDoneStatus;
  //   } else {
  //     idxTodo[0].taskDropStatus = !idxTodo[0].taskDropStatus;
  //   }
  //   const newTodoList = [...beforeIdxTodo, ...idxTodo, ...afterIdxTodo];
  //   console.log(todoList);
  //   console.log(newTodoList);
  //   setTodoList(newTodoList);
  //   // todo_postToServer(newTodoList);
  // };

  return (
    <>
      <form onSubmit={addNewTodo}>
        <div>
          <h4>category</h4>
          <select
            required={true}
            value={currentCategory}
            onChange={(e) => {
              setCurrentCategory(e.target.value);
            }}
          >
            <option disabled={true} value="">
              --Choose a category--
            </option>
            {categoriesList?.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {!addNewCategoryStatus && (
          <button
            onClick={() => {
              setAddNewCategoryStatus(true);
            }}
          >
            Add a New Category
          </button>
        )}
        {addNewCategoryStatus && (
          <div>
            <input
              id="category_text"
              placeholder="Enter a new Category"
            ></input>
            <button onClick={handleAddNewCategory}>add new category</button>
            <button onClick={() => setAddNewCategoryStatus(false)}>
              Close
            </button>
          </div>
        )}

        <h4>due date</h4>
        <DatePicker
          showIcon
          required
          placeholderText="Choose date"
          dateFormat="dd/MM/yyyy"
          isClearable={true}
          selected={currentDate}
          onChange={(e) => setNewDate(e)}
        />

        <input
          required
          id="quote_text"
          placeholder="Add Quote"
          onChange={(e) => setQuote(e.target.value)}
        ></input>
        <br />
        {!addNewMilestoneStatus && (
          <button onClick={() => setAddNewMilestoneStatus(true)}>
            Add milestones
          </button>
        )}
        {addNewMilestoneStatus && (
          <div>
            <input id="milestone_text" placeholder="Add Milestone"></input>
            <button onClick={handleAddNewMilestone} type="button">
              Add
            </button>
            <button
              onClick={() => setAddNewMilestoneStatus(false)}
              type="button"
            >
              Close
            </button>
          </div>
        )}
        <br></br>
        <br />
        <div className="form_preview">
          <h4>FORM REVIEW</h4>
          {currentCategory && <h5>Selected Category: {currentCategory}</h5>}
          {quote && <p>Added Goal: {quote}</p>}
          {currentDate && (
            <p>Current Date: {currentDate.toLocaleDateString()}</p>
          )}
          {milestoneList[0] && (
            <div>
              <h4>---Miilestones List---</h4>
              <ul>
                {milestoneList?.map((item) => (
                  <li>{item.milestoneText}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <br />
        <br></br>
        <button type="submit">Add Todo</button>
      </form>

      <br />
      {/* <DisplayTodoList todoList={todoList}></DisplayTodoList> */}
      <br />
      <h3>stop thinking & start doing</h3>
      <br />
      <br />

      <h2>List of all TODO's</h2>
      
      <todoListContext.Provider value={[todoList, setTodoList]}>
        <h5>inside components</h5>
        <TodoDisplayComponent></TodoDisplayComponent>
      </todoListContext.Provider>
      <h5>end of components</h5>
    </>
  );
}

export default TodoInputForm;
