import NoteCard from "./NoteCard/NoteCard";
import { useState, useEffect } from "react";
import Constants from "../utilities/Constants";
import AddForm from "./AddForm/AddForm";
import EditForm from "./EditForm/EditForm";
import AppHeader from "./AppHeader/AppHeader";
import LoadingSpinner from "./LoadingComponent/LoadingSpinner";
import Error from "./ErrorComponent/Error";

//import "./NoteMenu.css";

function NoteMenu() {
  const url = Constants.API_URL_GET_ALL_NOTES;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    GetDataFromServer();
  }, []);

  function isEditingHandler(_dataToUpdate) {
    setDataToUpdate(_dataToUpdate);
    console.log(_dataToUpdate);
    setIsEditing(true);
  }

  function isNotEditingHandler() {
    console.log("Not editing");
    setIsEditing(false);
  }

  function GetDataFromServer() {
    setLoading(true);
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((notesFromServer) => {
        setData(notesFromServer);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setLoading(false);
      });
  }

  const reversed = [...data].reverse();

  function FetchingWidget() {
    if (loading) {
      return (
        <div>
          <LoadingSpinner></LoadingSpinner>
        </div>
      );
    } else {
      if (isEditing) {
        return (
          <EditForm
            title={dataToUpdate.title}
            description={dataToUpdate.description}
            id={dataToUpdate.id}
            reloadData={GetDataFromServer}
            updateEditingMode={isNotEditingHandler}
          ></EditForm>
        );
      } else if (error) {
        return (
          <div>
            <Error></Error>
          </div>
        );
      } else {
        return (
          <div className="menu-table">
            <AddForm reloadData={GetDataFromServer}></AddForm>
            {reversed.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.description}
                dateCreated={note.createdDate}
                isEditingHandler={isEditingHandler}
                reload={GetDataFromServer}
              ></NoteCard>
            ))}
          </div>
        );
      }
    }
  }

  return (
    <div className="menu-table">
      <AppHeader></AppHeader>
      {FetchingWidget()}
    </div>
  );
}

export default NoteMenu;
