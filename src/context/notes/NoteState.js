import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const notesinitial = [
      {
        "_id": "667e348b5e8ab7dd84676a6e",
        "user": "667e218016be60b2455a5201",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "Personal",
        "date": "2024-06-28T03:56:59.624Z",
        "__v": 0
      },
      {
        "_id": "6688d0acf06344f23b1f227a",
        "user": "667e218016be60b2455a5201",
        "title": "My Title-2",
        "description": "Please wake up early",
        "tag": "Personal",
        "date": "2024-07-06T05:05:48.835Z",
        "__v": 0
      }
    ]
  
  const [notes,setNotes]=useState(notesinitial);
  return (
    <noteContext.Provider value={{notes, setNotes}}>{props.children}</noteContext.Provider>
  )
}
export default NoteState;
