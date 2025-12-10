// src/App.jsx
import { NavLink, Outlet } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";

export default function App() {
  return (
    <Layout
      sidebar={
        <nav className="sidebar-nav">
          <h2 className="sidebar-title">Dev Dashboard</h2>
          <NavLink to="/" end className="nav-link">
            Overview
          </NavLink>
          <NavLink to="/learning" className="nav-link">
            Learning
          </NavLink>
          <NavLink to="/tasks" className="nav-link">
            Tasks
          </NavLink>
          <NavLink to="/kt-sessions" className="nav-link">
            KT Sessions
          </NavLink>
        </nav>
      }
    >
      <Outlet />
    </Layout>
  );
}
