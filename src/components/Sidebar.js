export default function Sidebar(props) {
  const notesElement = props.notes.map((note) => (
    <div
      key={note.id}
      onClick={() => props.setCurrentNote(note)}
      className={`note-title ${
        note.id === props.currentNote.id ? "selected" : ""
      }`}
    >
      <p onDoubleClick={props.renameNote} className="text-snippet">
        {note.body
          .split("\n")[0]
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/g, "")
          .replace("url", "")}
      </p>

      <div className="sidebar-btns">
        <button onClick={(event) => props.downloadNote(event, note.id)} className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M7 20.981a6.5 6.5 0 0 1-2.936-12 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12V21H7v-.019zM13 12V8h-2v4H8l4 5 4-5h-3z"
              fill={
                note.id === props.currentNote.id
                  ? "rgba(255,255,255,1)"
                  : "rgba(74, 78, 116, 1)"
              }
            />
          </svg>
        </button>
        <button
          onClick={(event) => props.deleteNote(event, note.id)}
          className="btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M20 7v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7H2V5h20v2h-2zm-9 3v7h2v-7h-2zM7 2h10v2H7V2z"
              fill={
                note.id === props.currentNote.id
                  ? "rgba(255, 195, 0,1)"
                  : "rgba(74, 78, 116, 1)"
              }
            />
          </svg>
        </button>
      </div>
    </div>
  ));

  return (
    <main className="sidebar-container">
      <div className="sidebar-header">
        <h3>Markdown</h3>
        <button onClick={props.createNewNote} className="add-note-btn">
          +
        </button>
      </div>
      {notesElement}
    </main>
  );
}
