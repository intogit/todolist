import React, {
  useContext,
  useEffect,
} from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { credentialsContext } from "../App";

let id_count = 0;
function TodoInputForm() {
  const [todoList, setTodoList] = useState([]);
  const [categoriesList, setCategoriesList] = useState(["long goals","short goals", "wishlists"]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [addNewCategoryStatus, setAddNewCategoryStatus] = useState(false);

  const [currentDate, setNewDate] = useState(null);
  const [quote, setQuote] = useState(null);


  const [credentials] = useContext(credentialsContext);
  const todo_postToServer = (newTodoList) => {
    fetch("http://localhost:4000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodoList),
    }).then(() => {});
  };

  useEffect(() => {
    fetch("http://localhost:4000/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${credentials.username}:${credentials.password}`
      }
    })
    .then((response) => response.json())
    .then(findUserAndTodoList => setTodoList(findUserAndTodoList))
  }, [])


  const category_postToServer = (newCategoriesList) => {
    fetch("http://localhost:4000/todo_categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newCategoriesList),
    }).then(() => {});
  };
  useEffect(() => {
    fetch("http://localhost:4000/todo_categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${credentials.username}:${credentials.password}`
      }
    })
    .then((response) => response.json())
    .then(categoryList => setCategoriesList(categoryList))
  }, [])


  const handleAddNewCategory = () => {
    console.log("inside handleaddnewcategory");
    const newCategory = document.getElementById("category_text").value;
    const newCategoriesList = [...categoriesList, newCategory];
    setCategoriesList([...categoriesList, newCategory]);
    document.getElementById("category_text").value = "";
    setAddNewCategoryStatus(false);
    category_postToServer(newCategoriesList);
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
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setCurrentCategory("");
    setNewDate(null);
    setQuote(null);
    document.getElementById("quote_text").value = "";
    console.log(newTodoList);
    todo_postToServer(newTodoList);
  };

  const handleTaskStatus = (index, isDone) => {
    const idx = index - 1;
    const beforeIdxTodo = todoList.slice(0, idx);
    const afterIdxTodo = todoList.slice(idx + 1);
    const idxTodo = todoList.slice(idx, idx + 1);

    if (isDone) {
      idxTodo[0].taskDoneStatus = !idxTodo[0].taskDoneStatus;
    } else {
      idxTodo[0].taskDropStatus = !idxTodo[0].taskDropStatus;
    }
    const newTodoList = [...beforeIdxTodo, ...idxTodo, ...afterIdxTodo];
    console.log(todoList);
    console.log(newTodoList);
    setTodoList(newTodoList);
    todo_postToServer(newTodoList);
  };

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

        {/* :::TODO::: not working */}
        {/* <button
          onClick={() => {
            const quote_text = document.getElementById("quote").value;
            setNewQuote(quote_text);
            document.getElementById("quote").value = " ";
          }}
        >
          Add Quote
        </button> */}

        <br />
        <button type="submit">Add Todo</button>
      </form>
      <div>
        {currentCategory && <h5>{currentCategory}</h5>}
        {quote && <p>{quote}</p>}
        {currentDate && <p>{currentDate.toLocaleDateString()}</p>}
      </div>

      <br />
      {/* <DisplayTodoList todoList={todoList}></DisplayTodoList> */}
      <br />
      <h3>stop thinking & start doing</h3>
      <br />
      <br />

      <h2>List of all TODO's</h2>
      <ul>
        {todoList?.map((item, i) => (
          <div>
            {item.taskDoneStatus == 1 && (
              <li className="done" key={i}>
                {item.todoId} &nbsp;&nbsp; {item.category} &nbsp;&nbsp;{" "}
                {new Date(item.dueDate).toLocaleDateString()} &nbsp;&nbsp; {item.task}
                <h3>STATUS: done</h3>
              </li>
            )}

            {item.taskDropStatus == 1 && (
              <li className="drop" key={i}>
                {item.todoId} &nbsp;&nbsp; {item.category} &nbsp;&nbsp;{" "}
                {new Date(item.dueDate).toLocaleDateString()} &nbsp;&nbsp; {item.task}
                <h3>STATUS: drop</h3>
              </li>
            )}

            {item.taskDoneStatus == 0 && item.taskDropStatus == 0 && (
              <li className="none" key={i}>
                {item.todoId} &nbsp;&nbsp; {item.category} &nbsp;&nbsp;{" "}
                {new Date(item.dueDate).toLocaleDateString()} &nbsp;&nbsp; {item.task}
                <h3>STATUS: none</h3>
                {/* 1 for done and 0 for drop */}
                <button onClick={() => handleTaskStatus(item.todoId, 1)}>
                  Done
                </button>
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

export default TodoInputForm;
