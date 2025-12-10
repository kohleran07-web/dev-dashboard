// src/routes/Learning.jsx
import { useState } from "react";
import { useAppState } from "../context/AppStateContext.jsx";

export default function Learning() {
  const { state, dispatch } = useAppState();
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("React");

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

  return (
    <div className="page">
      <h2>Learning Log</h2>
      <p>Track what you’re learning across React, AEM, Java, and backend.</p>

      <form onSubmit={handleSubmit} className="form-inline">
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

      <ul className="list">
        {state.learningItems
          .slice()
          .reverse()
          .map((item) => (
            <li key={item.id}>
              <strong>{item.topic}</strong>{" "}
              <span className="pill">{item.category}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
