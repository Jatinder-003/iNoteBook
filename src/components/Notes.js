import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes} = context;
  return (
    <div className="row my-3">
      <h1>Your Notes</h1>

      {notes.map((notes) => {
        return <NoteItem key= {notes._id} notes={notes}/>
      })}
    </div>
  );
};

export default Notes;
