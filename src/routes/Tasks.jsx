// src/routes/Tasks.jsx
import { useState, useCallback, useMemo } from "react";
import { useAppState } from "../context/AppStateContext.jsx";

export default function Tasks() {
  const { state, dispatch } = useAppState();
  const [title, setTitle] = useState("");
  const [q, setQ] = useState("");

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

  const onQuery = useCallback((e) => setQ(e.target.value), []);

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    return state.tasks
      .slice()
      .reverse()
      .filter((t) => !qLower || t.title.toLowerCase().includes(qLower));
  }, [state.tasks, q]);

  return (
    <div className="page">
      <h2>Tasks</h2>
      <p>Track practice items, bug fixes, and enhancements you work on.</p>

      <form
        onSubmit={handleAdd}
        className="form-inline"
        style={{ marginBottom: 10 }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task (e.g. 'Refactor AEM component')"
          required
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Search tasks..."
          value={q}
          onChange={onQuery}
          style={{
            width: "100%",
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #374151",
            background: "#020617",
            color: "#e5e7eb",
          }}
        />
      </div>

      <ul className="list">
        {filtered.map((task) => (
          <li key={task.id}>
            <label
              className={task.done ? "task-done" : ""}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.title}</span>
            </label>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ color: "#9ca3af" }}>No tasks match your query.</li>
        )}
      </ul>
    </div>
  );
}
