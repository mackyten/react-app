import { useState } from "react";
import Constants from "../../utilities/Constants";
import "./EditForm.css";

function EditForm(props) {
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    props.description
  );

  function onUpdateNoteHandler(event) {
    const url = Constants.API_URL_POST_NOTE;
    event.preventDefault();

    const toUpdate = {
      id: props.id,
      Title: updatedTitle,
      Description: updatedDescription,
      CreatedDate: new Date(),
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        props.reloadData();
        props.updateEditingMode();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function onChangeTitle(event) {
    setUpdatedTitle(event.target.value);
  }

  function onChangeDescription(event) {
    setUpdatedDescription(event.target.value);
  }

  return (
    <div className="form">
      <form onSubmit={onUpdateNoteHandler}>
        <p>id: {props.id}</p>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          onChange={onChangeTitle}
          value={updatedTitle}
          id="title"
        ></input>

        <label htmlFor="description">Description</label>
        <input
          type="text"
          onChange={onChangeDescription}
          value={updatedDescription}
          id="description"
        ></input>

        <button type="submit" className="update">
          Update
        </button>

        <button
          type="submit"
          className="cancel"
          onClick={props.updateEditingMode}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditForm;
