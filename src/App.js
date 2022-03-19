import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Split from "react-split";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

export default function App() {

  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNote, setCurrentNote] = useState(notes[0] || "");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Write your title here",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentNote(newNote);
  }

  //
  function updateNote(text) {
    setNotes((oldNotes) => {
      let tempArr = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const note = oldNotes[i];
        if (note.id === currentNote.id) {
          tempArr.unshift({ ...note, body: text });
        } else {
          tempArr.push(note);
        }
      }
      return tempArr;
    });
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNote.id;
      }) || notes[0]
    );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();

    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function downloadNote(event, noteId) {
    event.stopPropagation();
    notes.map((note) => {
      if (note.id === noteId) {
        const element = document.createElement("a");
        const file = new Blob([note.body], {
          type: "text/plain",
        });
        element.href = URL.createObjectURL(file);
        element.download = `${note.body
          .split("\n")[0]
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/g, "")
          .replace("url", "")}.md`;
        document.body.appendChild(element);
        element.click();
      }
    });
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split
          className="split"
          sizes={[25, 75]}
          minSize={250}
          direction="horizontal"
        >
          <Sidebar
            notes={notes}
            createNewNote={createNewNote}
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            deleteNote={deleteNote}
            downloadNote={downloadNote}
          />
          <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
        </Split>
      ) : (
        <div className="no-notes">
          <h2>Currently you do not have any ongoing project</h2>
          <button onClick={createNewNote}>Create A readme</button>
        </div>
      )}
    </main>
  );
}
