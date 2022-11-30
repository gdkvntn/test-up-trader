import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import {
  changeTask,
  completeTask,
  deleteTask,
} from "../redux/reducers/projects";

export default function TableCard({ task, idPrj, index }) {
  const { files, id } = task;
  const option = useSelector((store) => {
    const prj = store.projects.projects.find((item) => item.id === +idPrj);
    return prj.tasks.find((item) => item.id === id);
  });
  const completed = useSelector((store) => {
    const prj = store.projects.projects.find((item) => item.id === +idPrj);
    return prj.tasks.find((item) => item.id === id).completed;
  });

  const [title, setTitle] = useState(option.title);
  const [text, setText] = useState(option.text);
  const [priority, setPriority] = useState(option.priority);
  const [creationDate, setCreationDate] = useState(option.creationDate);
  const [expirationDate, setExpirationDate] = useState(option.expirationDate);

  const wrapperChangeTask = (name, value) => {
    dispatch(changeTask(name, value, id, idPrj));
  };

  const dispatch = useDispatch();
  return (
    <div className={`tableCard ${completed ? "completed" : ""}`}>
      <div className="tableCard-block-one">
        <div className="tableCard-number">{index + 1}</div>
        <div className="TableCard-checkbox">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={completed}
            id={id}
            onChange={() => {
              dispatch(completeTask(id, idPrj));
            }}
          />
          <label htmlFor={id}></label>
        </div>
      </div>
      <div className="tableCard-block-sec">
        <div className="tableCard-date">
          <input
            type="date"
            className="input tableCard-creationDate"
            value={creationDate}
            onChange={(e) => {
              setCreationDate(e.target.value);
            }}
            onBlur={() => wrapperChangeTask("creationDate", creationDate)}
          />
          <input
            type="date"
            className="input tableCard-expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            onBlur={() => wrapperChangeTask("expirationDate", expirationDate)}
          />
          <div>
            <select
              name="priority"
              className="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              onBlur={() => wrapperChangeTask("priority", priority)}
            >
              <option value="lower">lower</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="tableCard-description">
          <input
            type="text"
            className="input tableCard-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => wrapperChangeTask("title", title)}
          />
          <textarea
            type="text"
            className="input tableCard-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => wrapperChangeTask("text", text)}
          />
        </div>

        <div>Files:{files}</div>
      </div>
      <button
        className="trashBtn"
        onClick={() => dispatch(deleteTask(id, idPrj))}
      >
        <TrashIcon />
      </button>
    </div>
  );
}
