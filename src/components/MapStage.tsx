import { useEffect, useRef } from "react";
import {
  CITY_PRESETS,
  FREE_LAYERS,
  US_STATES,
  mapboxToken,
  type LayerId,
} from "../model";

type Props = {
  latRaw: string;
  lngRaw: string;
  state: string;
  lat: number | null;
  lng: number | null;
  layers: Record<LayerId, boolean>;
  onLat: (value: string) => void;
  onLng: (value: string) => void;
  onState: (value: string) => void;
  onPreset: (lat: number, lng: number, state: string) => void;
};

export function MapStage({
  latRaw,
  lngRaw,
  state,
  lat,
  lng,
  layers,
  onLat,
  onLng,
  onState,
  onPreset,
}: Props) {
  const token = mapboxToken();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (token) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0E0D0C";
      ctx.fillRect(0, 0, w, h);

      const g = ctx.createRadialGradient(w * 0.35, h * 0.2, 20, w * 0.5, h * 0.5, Math.max(w, h));
      g.addColorStop(0, "#2A1A0A");
      g.addColorStop(0.55, "#161310");
      g.addColorStop(1, "#0E0D0C");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(200, 150, 42, 0.12)";
      ctx.lineWidth = 1;
      const step = 48;
      for (let x = 0; x <= w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(232, 226, 212, 0.08)";
      for (let i = 3; i <= 10; i++) {
        ctx.beginPath();
        ctx.ellipse(w / 2, h / 2, i * 28, i * 16, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      const cx = w / 2;
      const cy = h / 2;
      ctx.strokeStyle = "#FF6A00";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy);
      ctx.lineTo(cx + 18, cy);
      ctx.moveTo(cx, cy - 18);
      ctx.lineTo(cx, cy + 18);
      ctx.stroke();

      ctx.fillStyle = "#FF6A00";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#C8962A";
      ctx.font = "11px 'IBM Plex Mono', monospace";
      ctx.fillText("SCHEMATIC · NOT A SURVEY", 16, h - 16);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [token, lat, lng]);

  const staticMap =
    token && lat != null && lng != null
      ? `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-s+ff6a00(${lng},${lat})/${lng},${lat},8,0/1280x800@2x?access_token=${encodeURIComponent(token)}`
      : null;

  const armed = FREE_LAYERS.filter((layer) => layers[layer.id]);

  return (
    <section className="stage" aria-label="Map stage">
      <div className="stage-frame">
        <span className="tick tl" />
        <span className="tick tr" />
        <span className="tick bl" />
        <span className="tick br" />

        {staticMap ? (
          <img className="map-photo" src={staticMap} alt="Mapbox dark basemap at the operator pin" />
        ) : (
          <canvas ref={canvasRef} className="map-canvas" aria-label="Placeholder map canvas" />
        )}

        <div className="stage-badge">
          {token ? "MAPBOX STATIC" : "NO MAPBOX KEY"}
        </div>
      </div>

      <div className="stage-controls">
        <label className="field compact">
          <span>Latitude</span>
          <input
            inputMode="decimal"
            value={latRaw}
            onChange={(e) => onLat(e.target.value)}
            aria-invalid={lat == null}
          />
        </label>
        <label className="field compact">
          <span>Longitude</span>
          <input
            inputMode="decimal"
            value={lngRaw}
            onChange={(e) => onLng(e.target.value)}
            aria-invalid={lng == null}
          />
        </label>
        <label className="field compact">
          <span>State</span>
          <select value={state} onChange={(e) => onState(e.target.value)}>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} — {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field compact">
          <span>City pin (not a scored site)</span>
          <select
            defaultValue=""
            onChange={(e) => {
              const preset = CITY_PRESETS.find((p) => p.id === e.target.value);
              if (preset) onPreset(preset.lat, preset.lng, preset.state);
            }}
          >
            <option value="" disabled>
              Jump to a city…
            </option>
            {CITY_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="stage-legend">
        Armed overlays:{" "}
        {armed.length ? armed.map((l) => l.source).join(" · ") : "none"} — display intent only.
      </p>
    </section>
  );
}
