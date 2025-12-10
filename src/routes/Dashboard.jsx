// src/routes/Dashboard.jsx
import { useMemo } from "react";
import { useAppState } from "../context/AppStateContext.jsx";
import StatCard from "../components/UI/StatCard.jsx";

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
          subtitle="Practice items, bug fixes, enhancements"
        />
        <StatCard
          label="KT Sessions"
          value={stats.totalKt}
          subtitle="Topics shared with the team"
        />
      </div>
    </div>
  );
}
