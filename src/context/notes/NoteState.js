import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  //Get all notes
  const getallnotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTIxODAxNmJlNjBiMjQ1NWE1MjAxIn0sImlhdCI6MTcxOTU0MjE1Nn0.68NosSb5Nu-yMs51owUV8x3TMpIV1qFXGolN362nLA8",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTIxODAxNmJlNjBiMjQ1NWE1MjAxIn0sImlhdCI6MTcxOTU0MjE1Nn0.68NosSb5Nu-yMs51owUV8x3TMpIV1qFXGolN362nLA8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTIxODAxNmJlNjBiMjQ1NWE1MjAxIn0sImlhdCI6MTcxOTU0MjE1Nn0.68NosSb5Nu-yMs51owUV8x3TMpIV1qFXGolN362nLA8",
      },
    });
    const json = response.json();
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTIxODAxNmJlNjBiMjQ1NWE1MjAxIn0sImlhdCI6MTcxOTU0MjE1Nn0.68NosSb5Nu-yMs51owUV8x3TMpIV1qFXGolN362nLA8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    const newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getallnotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
