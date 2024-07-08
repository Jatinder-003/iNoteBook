import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { notes,updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">{notes.description}</p>
          <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
