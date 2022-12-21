import Constants from "../../utilities/Constants";
import "./NoteCard.css";

import { format } from "date-fns";

function NoteCard({
  id,
  title,
  description,
  dateCreated,
  isEditingHandler,
  reload,
}) {
  function SendData() {
    const dataFromServer = {
      id: id,
      title: title,
      description: description,
      dateCreated: dateCreated,
    };
    isEditingHandler(dataFromServer);
  }

  function deleteData() {
    const url = Constants.API_URL_DELETE_NOTE;
    const toDeleteUrl = url + `/${id}`;
    console.log(toDeleteUrl);

    fetch(toDeleteUrl, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        reload();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const onClick = async () => {
    var response = window.confirm(
      "Are you sure you want to delete this note??"
    );
    if (response) {
      deleteData();
    } else {
      console.log("no cancel");
    }
  };
  return (
    <div className="card">
      <span className="card-header">{title}</span>
      <span className="date-created">
        Date created: {format(Date.parse(dateCreated), "yyyy/MM/dd hh:mm a")}
      </span>
      <span className="id">id: {id}</span>

      <hr></hr>

      <div className="card-description">{description}</div>

      <hr></hr>

      <div className="buttons">
        <button type="submit" className="edit" onClick={SendData}>
          {" "}
          Edit{" "}
        </button>

        <button type="submit" className="delete" onClick={onClick}>
          {" "}
          Delete{" "}
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
