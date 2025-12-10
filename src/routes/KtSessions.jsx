// src/routes/KtSessions.jsx
import { useState } from "react";
import { useAppState } from "../context/AppStateContext.jsx";

export default function KtSessions() {
  const { state, dispatch } = useAppState();
  const [topic, setTopic] = useState("");
  const [owner, setOwner] = useState("Me");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    dispatch({
      type: "ADD_KT_SESSION",
      payload: {
        id: Date.now(),
        topic,
        owner,
        date: date || new Date().toISOString().slice(0, 10),
      },
    });

    setTopic("");
    setDate("");
  };

  return (
    <div className="page">
      <h2>KT Sessions</h2>
      <p>
        Log topics shared or learned during team knowledge transfer sessions.
      </p>

      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Session topic (e.g. 'useReducer deep dive')"
          required
        />
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Presenter"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="list">
        {state.ktSessions
          .slice()
          .reverse()
          .map((item) => (
            <li key={item.id}>
              <strong>{item.topic}</strong> — {item.owner}{" "}
              <span className="pill">{item.date || "No date"}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
