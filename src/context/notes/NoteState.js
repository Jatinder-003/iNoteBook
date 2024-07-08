import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const handleErrors = (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  };

  //Get all notes
  const getallnotes = async () => {
    //API call     
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmUzMWIzMTk0ZDdhYTJkNjJkMGU1In0sImlhdCI6MTcyMDQ3MzcwNH0.kMCzwO7Svj-y-YJ_wr2JoUv941GbXKvWhqXMx5JoF28"
        },
      });
      const data = await handleErrors(response);
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
      // Handle error (e.g., redirect to login)
    }
  };
  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmUzMWIzMTk0ZDdhYTJkNjJkMGU1In0sImlhdCI6MTcyMDQ3MzcwNH0.kMCzwO7Svj-y-YJ_wr2JoUv941GbXKvWhqXMx5JoF28"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmUzMWIzMTk0ZDdhYTJkNjJkMGU1In0sImlhdCI6MTcyMDQ3MzcwNH0.kMCzwO7Svj-y-YJ_wr2JoUv941GbXKvWhqXMx5JoF28"
      },
    });
    const json = response.json();
    console.log(json);
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmUzMWIzMTk0ZDdhYTJkNjJkMGU1In0sImlhdCI6MTcyMDQ3MzcwNH0.kMCzwO7Svj-y-YJ_wr2JoUv941GbXKvWhqXMx5JoF28"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

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
