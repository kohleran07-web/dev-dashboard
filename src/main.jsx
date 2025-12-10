// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Learning from "./routes/Learning.jsx";
import Tasks from "./routes/Tasks.jsx";
import KtSessions from "./routes/KtSessions.jsx";
import { AppStateProvider } from "./context/AppStateContext.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="learning" element={<Learning />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="kt-sessions" element={<KtSessions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  </React.StrictMode>
);
