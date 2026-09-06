import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ImportDialog({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" role="presentation" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-head">
          <p className="eyebrow">Land Desk · ingest</p>
          <h2 id="import-title">Import parcel / AOI</h2>
        </header>
        <p className="modal-copy">
          Stub only. Nothing is uploaded, parsed, or stored. Wire GeoJSON / KML / shapefile
          here later — this dialog does not invent a boundary.
        </p>
        <div className="dropzone" aria-disabled="true">
          <span className="dropzone-mark">//</span>
          <strong>GeoJSON · KML / KMZ · zipped shapefile</strong>
          <em>Drop disabled — parser not connected</em>
        </div>
        <label className="field">
          <span>Paste GeoJSON</span>
          <textarea
            rows={5}
            placeholder='{"type":"FeatureCollection","features":[]}'
            disabled
          />
        </label>
        <footer className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn solid" disabled>
            Import (not wired)
          </button>
        </footer>
      </div>
    </div>
  );
}
