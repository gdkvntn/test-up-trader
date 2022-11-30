import { useRef, useState } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/reducers/projects";
import createIdGenerator from "./id-generator";

const idGenerator = createIdGenerator();

export default function FormTask({ id }) {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [creationDate, setCreationDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const dispatch = useDispatch();
  const form = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addTask(id, form.current, files, idGenerator()));
    setFiles([]);
    setTitle("");
    setText("");
    setPriority("Medium");
    setCreationDate("");
    setExpirationDate("");
  };

  return (
    <form ref={form} className="formTask" onSubmit={(e) => submitForm(e)}>
      <input
        type="text"
        placeholder="Title"
        className="input task-title"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        type="text"
        placeholder="Text"
        className="input task-text"
        value={text}
        name="text"
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="date">
        <div>
          <p>Creation date:</p>
          <input
            type="date"
            className="input task-creationDate"
            name="creationDate"
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
          ></input>
        </div>
        <div>
          <p>Expiration date:</p>
          <input
            type="date"
            className="input task-expirationDate"
            name="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          ></input>
        </div>
      </div>

      <select
        name="priority"
        className="select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="lower">lower</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server={null}
        name="files"
        labelIdle="Add or drag a file"
      />
      <button className="btn">Create task</button>
    </form>
  );
}
