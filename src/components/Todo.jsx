import React from "react";
import { useState } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const categories = [
  { value: "long_term_goals", text: "long term goals" },
  { value: "short_term_goals", text: "short term goals" },
  { value: "wishlists", text: "wishlists" },
];


function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [categoriesList, setCategoriesList] = useState(categories);
  const [currentCategory, setCurrentCategory] = useState("");
  const [addNewCategoryStatus, setAddNewCategoryStatus] = useState(false);

  const [currentDate, setNewDate] = useState(null);
  const [quote, setQuote] = useState(null);

  const handleAddNewCategory = () => {
    console.log("inside handleaddnewcategory");
    const category_text = document.getElementById("category_text").value;

    const newCategory = {
      value: category_text,
      text: category_text,
    };
    setCategoriesList([...categoriesList, newCategory]);
    document.getElementById("category_text").value = "";
    setAddNewCategoryStatus(false);
  };

  const addNewTodo = (e) => {
    e.preventDefault();
    console.log("in add new todo");
    const newTodo = {
      category: currentCategory,
      dueDate: currentDate,
      task: quote,
    };
    setTodoList([...todoList, newTodo]);
    setCurrentCategory("");
    setNewDate(null);
    setQuote(null);
    document.getElementById("quote_text").value = "";
    console.log(newTodo);
    console.log(todoList);
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
            {categoriesList.map((item, i) => (
              <option key={i} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        {!addNewCategoryStatus && (
          <button 
            onClick={() => {
              setAddNewCategoryStatus(true);
            }}
          >Add a New Category</button>
        )}
        {addNewCategoryStatus && (
          <div>
            <input
              id="category_text"
              placeholder="Enter a new Category"
            ></input>
            <button onClick={handleAddNewCategory}>add new category</button>
            <button onClick={()=> (setAddNewCategoryStatus(false))}>Close</button>
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

        <br/>
        <button type="submit">Add Todo</button>
      </form>
      <div>
        {currentCategory && <h5>{currentCategory}</h5>}
        {quote && <p>{quote}</p>}
        {currentDate && <p>{currentDate.toLocaleDateString()}</p>}
      </div>

        <br />
        <br />
        <h3>stop thinking & start doing</h3>
        <br/>
        <br />

        <h2>List of all TODO's</h2>
      <ul>
        {todoList.map((item, i) => (
          <li key={i}>
            {item.category} &nbsp;&nbsp; {item.dueDate.toLocaleDateString()} &nbsp;&nbsp; {item.task}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
