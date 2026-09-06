export default function App() {
  return (
    <div className="shell">
      <header className="top">
        <div>
          <p className="eyebrow">Land Desk · Fluidstack GIS</p>
          <h1>Site Brief</h1>
        </div>
        <span className="pill">public preview</span>
      </header>

      <main className="grid">
        <section className="card">
          <h2>Walk-aways (free layers only)</h2>
          <ul>
            <li>FEMA NFHL flood</li>
            <li>USGS elevation / slope (3DEP)</li>
            <li>HIFLD transmission / substations</li>
            <li>FCC BDC fiber availability</li>
            <li>NETL / state wells (NM, CO)</li>
          </ul>
          <p className="mute">
            Voltage headroom, fiber route owners, and cadastral remain UNKNOWN until paid
            layers or utility letters land.
          </p>
        </section>

        <section className="card">
          <h2>Status</h2>
          <p>
            Origin build is ready. This public URL is the GitHub → Vercel path so the app is
            shareable without waiting on Origin OAuth.
          </p>
          <p className="mute">Full map + data pack follow on sibling deploys.</p>
        </section>
      </main>
    </div>
  );
}
