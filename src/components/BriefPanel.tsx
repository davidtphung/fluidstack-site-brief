import {
  UNKNOWN_LEDGER,
  type HeuristicResult,
  type MetricStatus,
  type MetricTile,
} from "../model";

type Props = {
  siteName: string;
  onName: (value: string) => void;
  metrics: MetricTile[];
  heuristic: HeuristicResult;
};

const STATUS_LABEL: Record<MetricStatus, string> = {
  operator: "OPERATOR",
  not_queried: "NOT QUERIED",
  unknown: "UNKNOWN",
  coverage: "COVERAGE",
};

export function BriefPanel({ siteName, onName, metrics, heuristic }: Props) {
  return (
    <aside className="brief" aria-label="Site Brief">
      <header className="brief-head">
        <p className="eyebrow">Site Brief</p>
        <label className="name-field">
          <span className="sr-only">Site name</span>
          <input
            value={siteName}
            onChange={(e) => onName(e.target.value)}
            maxLength={64}
          />
        </label>
        <p className="brief-kicker">
          AI data-center test-fit. Free-layer walk-aways only. No MW, owners, or prices.
        </p>
      </header>

      <section className="brief-section">
        <div className="section-label">
          <h3>Metric tiles</h3>
          <span>Live values stay empty until layers run</span>
        </div>
        <div className="tiles">
          {metrics.map((tile) => (
            <article key={tile.id} className={`tile status-${tile.status}`}>
              <header>
                <h4>{tile.label}</h4>
                <em className={`chip ${tile.status}`}>{STATUS_LABEL[tile.status]}</em>
              </header>
              <p className="tile-value">{tile.value}</p>
              <footer>
                <span>{tile.source}</span>
                {tile.note ? <small>{tile.note}</small> : null}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="brief-section heuristic">
        <div className="section-label">
          <h3>Risk heuristic</h3>
          <em className="chip heuristic-chip">HEURISTIC — NOT A SCORE</em>
        </div>
        <div className="verdict">
          <strong>{heuristic.verdict}</strong>
          <p>{heuristic.summary}</p>
          <div className="coverage-bar" aria-hidden="true">
            <span style={{ flex: heuristic.freeWalkAways }} />
            <b style={{ flex: heuristic.unknownBlocks }} />
          </div>
          <p className="coverage-caption">
            {heuristic.freeWalkAways} free walk-away families · {heuristic.unknownBlocks} hard
            UNKNOWN blocks
          </p>
        </div>
        <ul className="flag-list">
          {heuristic.flags.map((flag) => (
            <li key={flag.id} className={`flag ${flag.tone}`}>
              <span className={`led ${flag.tone}`} />
              <div>
                <strong>{flag.title}</strong>
                <p>{flag.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="brief-section">
        <div className="section-label">
          <h3>Unknown ledger</h3>
          <span>Do not invent these fields</span>
        </div>
        <ul className="ledger">
          {UNKNOWN_LEDGER.map((item) => (
            <li key={item.id}>
              <header>
                <h4>{item.label}</h4>
                <em className="chip unknown">UNKNOWN</em>
              </header>
              <p>{item.why}</p>
              <small>Needs: {item.needed}</small>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
