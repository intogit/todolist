import React from "react";

function AddNewCategory(props){
    const AddNewCategory = (e) => {
        console.log(e.target.value);
        const newCategory = {
            value: e.target.value,
            text: e.target.value,
        }
        props.categories.push(newCategory);
    } 
    return(
        <div>
            <input placeholder="Enter a new Category"></input>
            <button type="submit" onClick={AddNewCategory}>Add</button>
        </div>
    )
}
export default AddNewCategory