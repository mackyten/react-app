import { addHours } from "date-fns";
import { useState } from "react";
import Constants from "../../utilities/Constants";
import "./AddForm.css";

function AddForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const url = Constants.API_URL_POST_NOTE;

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  function onChangeDescription(event) {
    setDescription(event.target.value);
  }

  function onAddNewNoteHandler(event) {
    event.preventDefault();
    if (title.replaceAll(" ", "").length == 0) {
      alert("Title is a required field");
    } else {
      const newNote = {
        Title: title,
        Description: description,
        CreatedDate: addHours(new Date(), 8),
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      })
        .then((response) => response.json())
        .then((data) => {
          props.reloadData();
          console.log("Success:", data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });

      setTitle("");
      setDescription("");
    }
  }

  return (
    <div className="form">
      <form onSubmit={onAddNewNoteHandler}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          onChange={onChangeTitle}
          value={title}
          id="title"
        ></input>

        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          onChange={onChangeDescription}
          value={description}
          id="description"
        ></textarea>

        <button type="submit">Add new note</button>
      </form>
    </div>
  );
}

export default AddForm;
