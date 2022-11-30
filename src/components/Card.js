import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import { completeProject, deleteProject } from "../redux/reducers/projects";

export default function Card({ project }) {
  const dispatch = useDispatch();
  const completed = useSelector(
    (store) =>
      store.projects.projects.find((item) => item.id === project.id).completed
  );

  return (
    <div className="projectCard ">
      <div>
        <div className="projectCard-checkbox">
          <input
            type="checkbox"
            className="custom-checkbox"
            id={project.id}
            checked={completed}
            onChange={() => {
              dispatch(completeProject(project.id));
            }}
          />
          <label htmlFor={project.id}></label>
        </div>
        <div className={`projectCard-name ${completed ? "active" : ""}`}>
          <Link to={`/${project.id}`}> {project.name}</Link>
        </div>
      </div>

      <button
        className="trashBtn"
        onClick={() => dispatch(deleteProject(project.id))}
      >
        <TrashIcon />
      </button>
    </div>
  );
}
