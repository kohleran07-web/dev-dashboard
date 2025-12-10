// src/routes/Tasks.jsx
import { useState, useCallback } from "react";
import { useAppState } from "../context/AppStateContext.jsx";

export default function Tasks() {
  const { state, dispatch } = useAppState();
  const [title, setTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        title,
        done: false,
      },
    });

    setTitle("");
  };

  const toggleTask = useCallback(
    (id) => {
      dispatch({ type: "TOGGLE_TASK", payload: id });
    },
    [dispatch]
  );

  return (
    <div className="page">
      <h2>Tasks</h2>
      <p>Track practice items, bug fixes, and enhancements you work on.</p>

      <form onSubmit={handleAdd} className="form-inline">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task (e.g. 'Refactor AEM component')"
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul className="list">
        {state.tasks
          .slice()
          .reverse()
          .map((task) => (
            <li key={task.id}>
              <label className={task.done ? "task-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                {task.title}
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
}
