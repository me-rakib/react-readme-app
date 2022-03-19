import MDEditor from "@uiw/react-md-editor";

export default function Editor({ currentNote, updateNote }) {
  return (
    <div className="container">
      <MDEditor
        height={"100vh"}
        value={currentNote.body}
        onChange={updateNote}
      />
    </div>
  );
}
