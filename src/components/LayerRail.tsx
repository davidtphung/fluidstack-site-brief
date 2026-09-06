import { FREE_LAYERS, UNKNOWN_LEDGER, type LayerId } from "../model";

type Props = {
  enabled: Record<LayerId, boolean>;
  onToggle: (id: LayerId) => void;
};

export function LayerRail({ enabled, onToggle }: Props) {
  return (
    <aside className="rail" aria-label="Layer rail">
      <div className="rail-block">
        <p className="eyebrow">Free walk-aways</p>
        <h2>Layer rail</h2>
        <p className="rail-note">
          Toggles mark intent only. No live FEMA / 3DEP / HIFLD / FCC / well query runs in this
          build.
        </p>
        <ul className="layer-list">
          {FREE_LAYERS.map((layer) => (
            <li key={layer.id}>
              <label className="layer-row">
                <input
                  type="checkbox"
                  checked={enabled[layer.id]}
                  onChange={() => onToggle(layer.id)}
                />
                <span>
                  <strong>{layer.label}</strong>
                  <small>{layer.source}</small>
                </span>
                <em className="chip free">FREE</em>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="rail-block">
        <p className="eyebrow">Not on the rail</p>
        <h2>UNKNOWN layers</h2>
        <ul className="unknown-mini">
          {UNKNOWN_LEDGER.map((item) => (
            <li key={item.id}>
              <span className="led unknown" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
