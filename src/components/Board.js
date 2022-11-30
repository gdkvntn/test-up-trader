import { useSelector } from "react-redux";
import noResultIcon from "../assets/svg/Clipboard.svg";
import Card from "./Card";

export default function Board() {
  const completedCount = useSelector(
    (store) => store.projects.completedItems.length
  );
  const projects = useSelector((store) => store.projects.projects);
  return (
    <div className="board">
      <div className="board-header">
        <div>
          Created projects
          <span>{projects.length}</span>
        </div>
        <div>
          Completed<span>{completedCount}</span>
        </div>
      </div>
      <div className="board-body">
        {projects.length ? (
          <ul className="board-list">
            {projects.map((item) => {
              return (
                <li key={item.name + Math.random()}>
                  <Card project={item} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="board-noResult">
            <img src={noResultIcon} alt="icon"></img>
            <div>
              <p>You don't have registered projects yet</p>
              <p>Create project and organize your affairs</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
