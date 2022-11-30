const ADD = "ADD";
const DELETE = "DELETE";
const COMPLETE = "COMPLETE";
const ADDTASK = "ADDTASK";
const DELETETASK = "DELETETASK";
const COMPLETETASK = "COMPLETETASK";
const DRAGEND = "DRAGEND";
const CHANGETASK = "CHANGETASK";

const initialState = {
  projects: [],
  completedItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            name: action.name,
            completed: false,
            id: action.id,
            tasks: [],
            columns: {
              0: {
                name: "Queue",
                items: [],
              },
              1: {
                name: "Development",
                items: [],
              },
              2: {
                name: "Done",
                items: [],
              },
            },
            completedTask: [],
          },
        ],
      };
    }

    case DELETE: {
      return {
        ...state,
        projects: state.projects.filter((item) => item.id !== action.id),
        completedItems: state.completedItems.filter(
          (item) => item.id !== action.id
        ),
      };
    }
    case COMPLETE: {
      const completedItem = state.projects.find(
        (item) => item.id === action.id
      );
      completedItem.completed = !completedItem.completed;
      if (completedItem.completed) {
        state.completedItems.push(completedItem);
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          completedItems: state.completedItems.filter(
            (item) => item.id !== action.id
          ),
        };
      }
    }
    case ADDTASK: {
      let formData = new FormData(action.form);
      const addData = {
        title: formData.get("title"),
        text: formData.get("text"),
        completed: false,
        id: action.idTask,
        priority: formData.get("priority"),
        creationDate: formData.get("creationDate"),
        expirationDate: formData.get("expirationDate"),
      };

      return {
        ...state,
        projects: state.projects.map((item) => {
          if (item.id === +action.id) {
            return {
              ...item,
              tasks: [...item.tasks, addData],
              columns: {
                ...item.columns,
                0: {
                  ...item.columns[0],
                  items: [...item.columns[0].items, addData],
                },
              },
            };
          }
          return item;
        }),
      };
    }
    case DELETETASK: {
      return {
        ...state,
        projects: state.projects.map((item) => {
          if (item.id === +action.idPrj) {
            return {
              ...item,
              tasks: item.tasks.filter((item) => item.id !== action.id),
              completedTask: item.completedTask.filter(
                (item) => item.id !== action.id
              ),
              columns: Object.entries(item.columns).map(([nameds, items]) => {
                return {
                  name: items.name,
                  items: items.items.filter((el) => el.id !== action.id),
                };
              }),
            };
          }
          return item;
        }),
      };
    }
    case COMPLETETASK: {
      const prj = state.projects.find((item) => item.id === +action.idPrj);
      const task = prj.tasks.find((item) => item.id === action.id);
      task.completed = !task.completed;

      if (task.completed) {
        prj.completedTask.push(task);
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          projects: state.projects.map((item) => {
            if (item.id === +action.idPrj) {
              return {
                ...item,
                completedTask: item.completedTask.filter(
                  (item) => item.id !== action.id
                ),
              };
            }
            return item;
          }),
        };
      }
    }

    case DRAGEND: {
      if (!action.result.destination) return state;

      const { source, destination } = action.result;
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = action.columns[source.droppableId];
        const destColumn = action.columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        return {
          ...state,
          projects: state.projects.map((item) => {
            if (item.id === +action.idPrj) {
              return {
                ...item,
                columns: {
                  ...item.columns,
                  [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                  },
                  [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                  },
                },
              };
            }
            return item;
          }),
        };
      } else {
        const column = action.columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        return {
          ...state,
          projects: state.projects.map((item) => {
            if (item.id === +action.idPrj) {
              return {
                ...item,
                columns: {
                  ...item.columns,
                  [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                  },
                },
              };
            }
            return item;
          }),
        };
      }
    }
    case CHANGETASK: {
      const prj = state.projects.find((item) => item.id === +action.idPrj);
      const task = prj.tasks.find((item) => item.id === action.id);

      task[action.name] = action.value;

      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export const addProject = (name, id) => {
  return (dispatch) => {
    return dispatch({ type: ADD, name, id });
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    return dispatch({ type: DELETE, id });
  };
};

export const completeProject = (id) => {
  return (dispatch) => {
    return dispatch({ type: COMPLETE, id });
  };
};

export const addTask = (id, form, files, idTask) => {
  return (dispatch) => {
    return dispatch({ type: ADDTASK, id, form, files, idTask });
  };
};

export const deleteTask = (id, idPrj) => {
  return (dispatch) => {
    return dispatch({ type: DELETETASK, id, idPrj });
  };
};

export const completeTask = (id, idPrj) => {
  return (dispatch) => {
    return dispatch({ type: COMPLETETASK, id, idPrj });
  };
};
export const changeTask = (name, value, id, idPrj) => {
  return (dispatch) => {
    return dispatch({ type: CHANGETASK, name, value, id, idPrj });
  };
};
export const onDragEnd = (result, columns, idPrj) => {
  return (dispatch) => {
    return dispatch({ type: DRAGEND, result, columns, idPrj });
  };
};
