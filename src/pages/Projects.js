import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../assets/svg/add.svg";
import Board from "../components/Board";
import { addProject } from "../redux/reducers/projects";
import Card from "../components/Card";
import createIdGenerator from "../components/id-generator";

const idGenerator = createIdGenerator();

export default function Projects() {
  const [nameProject, setNameProject] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="projects">
      <div className="projects-header">
        <input
          className="input"
          placeholder="Name project"
          type="text"
          value={nameProject}
          onChange={(e) => setNameProject(e.target.value)}
        ></input>
        <button
          className="btn"
          onClick={() => {
            dispatch(addProject(nameProject, idGenerator()));
            setNameProject("");
          }}
        >
          Add <img src={icon} alt="icon"></img>
        </button>
      </div>
      <div className="projects-board">
        <Board />
      </div>
    </div>
  );
}
