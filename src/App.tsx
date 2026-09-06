import { useMemo, useState } from "react";
import { BriefPanel } from "./components/BriefPanel";
import { ImportDialog } from "./components/ImportDialog";
import { LayerRail } from "./components/LayerRail";
import { MapStage } from "./components/MapStage";
import {
  DEFAULT_LAYERS,
  buildMetrics,
  evaluateHeuristic,
  parseCoord,
  type LayerId,
} from "./model";

export default function App() {
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [latRaw, setLatRaw] = useState("35.0844");
  const [lngRaw, setLngRaw] = useState("-106.6504");
  const [state, setState] = useState("NM");
  const [siteName, setSiteName] = useState("Untitled pin");
  const [importOpen, setImportOpen] = useState(false);

  const lat = parseCoord(latRaw, -90, 90);
  const lng = parseCoord(lngRaw, -180, 180);

  const metrics = useMemo(() => buildMetrics({ lat, lng, state }), [lat, lng, state]);
  const heuristic = useMemo(
    () => evaluateHeuristic({ lat, lng, state }),
    [lat, lng, state],
  );

  const toggleLayer = (id: LayerId) => {
    setLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="desk">
      <header className="topbar">
        <div className="brand">
          <span className="mark" aria-hidden="true" />
          <div>
            <p className="eyebrow">Fluidstack · Land Desk</p>
            <h1>Site Brief</h1>
          </div>
        </div>
        <p className="topbar-rule">
          GIS test-fit for AI data-center siting. Free layers only. Voltage, headroom MW, fiber
          owners, cadastral, and WHP stay UNKNOWN.
        </p>
        <div className="topbar-actions">
          <button type="button" className="btn ghost" onClick={() => setImportOpen(true)}>
            Import
          </button>
          <span className="pill">public preview</span>
        </div>
      </header>

      <div className="workspace">
        <LayerRail enabled={layers} onToggle={toggleLayer} />
        <MapStage
          latRaw={latRaw}
          lngRaw={lngRaw}
          state={state}
          lat={lat}
          lng={lng}
          layers={layers}
          onLat={setLatRaw}
          onLng={setLngRaw}
          onState={setState}
          onPreset={(nextLat, nextLng, nextState) => {
            setLatRaw(String(nextLat));
            setLngRaw(String(nextLng));
            setState(nextState);
          }}
        />
        <BriefPanel
          siteName={siteName}
          onName={setSiteName}
          metrics={metrics}
          heuristic={heuristic}
        />
      </div>

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
