// src/routes/Dashboard.jsx
import { useMemo } from "react";
import { useAppState } from "../context/AppStateContext.jsx";
import StatCard from "../components/UI/StatCard.jsx";
import { useFetch } from "../hooks/useFetch.js";

export default function Dashboard() {
  const { state } = useAppState();

  const stats = useMemo(() => {
    const totalLearning = state.learningItems.length;
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter((t) => t.done).length;
    const totalKt = state.ktSessions.length;

    return {
      totalLearning,
      totalTasks,
      completedTasks,
      totalKt,
    };
  }, [state.learningItems, state.tasks, state.ktSessions]);

  // Example external API (public demo endpoint) — change URL if you prefer
  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products?limit=4"
  );

  return (
    <div className="page">
      <h2>Overview</h2>
      <p>Snapshot of your learning, tasks and KT sessions.</p>

      <div className="stat-grid">
        <StatCard
          label="Learning Items Logged"
          value={stats.totalLearning}
          subtitle="Across React, AEM, Java, Backend"
        />
        <StatCard
          label="Tasks Completed"
          value={`${stats.completedTasks}/${stats.totalTasks}`}
          subtitle="Completed / Total"
        />
        <StatCard
          label="KT Sessions"
          value={stats.totalKt}
          subtitle="Topics shared with the team"
        />
      </div>

      <section style={{ marginTop: "1.25rem" }}>
        <h3>Sample External Data</h3>
        <p style={{ marginTop: 0, color: "#9ca3af" }}>
          Demonstrates a custom hook (useFetch) fetching JSON from a public API.
        </p>

        {loading && <div>Loading sample items…</div>}
        {error && (
          <div style={{ color: "#f87171" }}>
            Error loading data: {String(error)}
          </div>
        )}

        {!loading && data && Array.isArray(data) && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: "0.75rem",
              marginTop: "0.75rem",
            }}
          >
            {data.map((item) => (
              <div
                key={item.id}
                style={{
                  borderRadius: 8,
                  padding: 10,
                  background: "#020617",
                  border: "1px solid #111827",
                }}
              >
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  {item.category}
                </div>
                <div style={{ fontWeight: 600, marginTop: 6 }}>
                  {item.title}
                </div>
                <div style={{ marginTop: 6, fontSize: 13, color: "#6b7280" }}>
                  ₹ {item.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
