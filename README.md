# Fluidstack Land Desk · Site Brief

Vite + React desk for AI data-center site forecasting / test-fit.

This is a **screening UI**, not a diligence engine. It only claims the free walk-away layers:

- FEMA NFHL (flood)
- USGS 3DEP (elevation / slope)
- HIFLD (transmission / substations)
- FCC BDC (fiber **availability**)
- NETL / state wells — **NM OCD** and **CO OGCC** only

## Hard UNKNOWN

These fields are labeled UNKNOWN and are never invented:

- Line voltage / interconnect **headroom MW**
- Fiber **route owners**
- Nationwide **cadastral**
- **WHP** (wellhead pressure)
- Prices

The risk panel is a **heuristic on layer coverage**. It is not a site score, forecast, or interconnect study.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Optional Mapbox static basemap:

```bash
# .env
VITE_MAPBOX_TOKEN=pk....
```

Without the token the map is a schematic canvas. Lat / lng / state still drive the brief.
