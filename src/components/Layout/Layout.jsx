// src/components/Layout/Layout.jsx
export default function Layout({ sidebar, children }) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">{sidebar}</aside>
      <main className="app-main">
        <header className="app-header">
          <h1>Developer Learning & Work Dashboard</h1>
        </header>
        <section className="app-content">{children}</section>
      </main>
    </div>
  );
}
