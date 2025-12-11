// src/routes/Learning.jsx
import { useState, useCallback, useMemo } from "react";
import { useAppState } from "../context/AppStateContext.jsx";

export default function Learning() {
  const { state, dispatch } = useAppState();
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("React");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    dispatch({
      type: "ADD_LEARNING",
      payload: {
        id: Date.now(),
        topic,
        category,
        createdAt: new Date().toISOString(),
      },
    });

    setTopic("");
  };

  const onQuery = useCallback((e) => setQ(e.target.value), []);
  const onFilter = useCallback((e) => setFilter(e.target.value), []);

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    return state.learningItems
      .slice()
      .reverse()
      .filter((item) => {
        if (filter !== "All" && item.category !== filter) return false;
        if (!qLower) return true;
        return (
          item.topic.toLowerCase().includes(qLower) ||
          (item.category || "").toLowerCase().includes(qLower)
        );
      });
  }, [state.learningItems, q, filter]);

  return (
    <div className="page">
      <h2>Learning Log</h2>
      <p>Track what you’re learning across React, AEM, Java, and backend.</p>

      <form
        onSubmit={handleSubmit}
        className="form-inline"
        style={{ marginBottom: 12 }}
      >
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What did you learn today?"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>React</option>
          <option>AEM</option>
          <option>Java</option>
          <option>Backend</option>
          <option>Other</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <input
          placeholder="Search topics or categories..."
          value={q}
          onChange={onQuery}
          style={{
            flex: 1,
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #374151",
            background: "#020617",
            color: "#e5e7eb",
          }}
        />
        <select
          value={filter}
          onChange={onFilter}
          style={{ padding: "6px 8px", borderRadius: 6 }}
        >
          <option>All</option>
          <option>React</option>
          <option>AEM</option>
          <option>Java</option>
          <option>Backend</option>
          <option>Other</option>
        </select>
      </div>

      <ul className="list">
        {filtered.map((item) => (
          <li key={item.id}>
            <strong>{item.topic}</strong>{" "}
            <span className="pill">{item.category}</span>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ color: "#9ca3af" }}>No items match your query.</li>
        )}
      </ul>
    </div>
  );
}
