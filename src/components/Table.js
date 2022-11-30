import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { onDragEnd } from "../redux/reducers/projects";
import TableCard from "./TableCard";

// const onDragEnd = (result, columns, setColumns) => {
//   if (!result.destination) return;

//   const { source, destination } = result;
//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = columns[source.droppableId];
//     const destColumn = columns[destination.droppableId];
//     const sourceItems = [...sourceColumn.items];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems,
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems,
//       },
//     });
//   } else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);

//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems,
//       },
//     });
//   }
// };

export default function Table({ idPrj }) {
  const project = useSelector((store) =>
    store.projects.projects.find((item) => item.id === +idPrj)
  );
  const columns = useSelector(
    (store) =>
      store.projects.projects.find((item) => item.id === +idPrj).columns
  );
  const completedTask = useSelector(
    (store) =>
      store.projects.projects.find((item) => item.id === +idPrj).completedTask
        .length
  );

  const dispatch = useDispatch();
  return (
    <div className="table">
      <div className="table-header">
        <div>
          Created
          <span>{project.tasks.length}</span>
        </div>

        <div>
          Completed<span>{completedTask}</span>
        </div>
      </div>
      <div className="table-body">
        <DragDropContext
          onDragEnd={(res) => dispatch(onDragEnd(res, columns, idPrj))}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div key={id} className="table-column">
                <h2>{column.name}</h2>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          borderRadius: 8,
                          background: snapshot.isDraggingOver
                            ? "rgba(0, 0, 0, 0.5)"
                            : "transparent",
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id + ""}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <TableCard
                                      task={item}
                                      idPrj={idPrj}
                                      index={index}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
