export type LayerId =
  | "fema"
  | "elev"
  | "slope"
  | "trans"
  | "sub"
  | "fiber"
  | "wells";

export type MetricStatus = "operator" | "not_queried" | "unknown" | "coverage";

export interface LayerDef {
  id: LayerId;
  label: string;
  source: string;
  kind: "free";
  walkAway: string;
}

export interface UnknownDef {
  id: string;
  label: string;
  why: string;
  needed: string;
}

export interface MetricTile {
  id: string;
  label: string;
  value: string;
  source: string;
  status: MetricStatus;
  note?: string;
}

export interface HeuristicFlag {
  id: string;
  tone: "block" | "warn" | "info";
  title: string;
  detail: string;
}

export interface HeuristicResult {
  verdict: string;
  summary: string;
  flags: HeuristicFlag[];
  freeWalkAways: number;
  unknownBlocks: number;
}

export const FREE_LAYERS: LayerDef[] = [
  {
    id: "fema",
    label: "Flood",
    source: "FEMA NFHL",
    kind: "free",
    walkAway: "Floodway / high-risk NFHL zones — once queried",
  },
  {
    id: "elev",
    label: "Elevation",
    source: "USGS 3DEP",
    kind: "free",
    walkAway: "Pad elevation / cut-fill — once queried",
  },
  {
    id: "slope",
    label: "Slope",
    source: "USGS 3DEP",
    kind: "free",
    walkAway: "Steep grade that fails test-fit — once queried",
  },
  {
    id: "trans",
    label: "Transmission",
    source: "HIFLD",
    kind: "free",
    walkAway: "No nearby mapped line — once queried. Voltage stays UNKNOWN.",
  },
  {
    id: "sub",
    label: "Substations",
    source: "HIFLD",
    kind: "free",
    walkAway: "No nearby mapped substation — once queried. Headroom MW stays UNKNOWN.",
  },
  {
    id: "fiber",
    label: "Fiber availability",
    source: "FCC BDC",
    kind: "free",
    walkAway: "No BDC availability at the pin — once queried. Route owners stay UNKNOWN.",
  },
  {
    id: "wells",
    label: "Wells",
    source: "NETL / NM OCD / CO OGCC",
    kind: "free",
    walkAway: "Active or conflicting wells — NM and CO only, once queried.",
  },
];

export const UNKNOWN_LEDGER: UnknownDef[] = [
  {
    id: "voltage",
    label: "Line voltage (kV)",
    why: "HIFLD geometry is a walk-away layer. Nameplate voltage is not treated as a free, reliable nationwide field here.",
    needed: "Utility GIS, interconnection docs, or a paid grid pack",
  },
  {
    id: "headroom",
    label: "Interconnect headroom (MW)",
    why: "No free nationwide headroom layer. Inventing MW would be a false screen.",
    needed: "Utility letter, queue study, or paid capacity data",
  },
  {
    id: "fiber-owners",
    label: "Fiber route owners",
    why: "FCC BDC reports availability, not who owns the route or laterals.",
    needed: "Provider maps, IRU / dark-fiber quotes, or a paid fiber pack",
  },
  {
    id: "cadastral",
    label: "Nationwide cadastral / parcels",
    why: "No free, complete national parcel fabric in this desk.",
    needed: "County assessor, paid cadastral, or title plant",
  },
  {
    id: "whp",
    label: "WHP (wellhead pressure)",
    why: "Not in the free well set. NETL / NM OCD / CO OGCC are presence walk-aways, not pressure.",
    needed: "Operator / state well file with pressure fields",
  },
];

export const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export const WELL_STATES: Record<string, string> = {
  NM: "NM OCD",
  CO: "CO OGCC",
};

export const CITY_PRESETS = [
  { id: "abq", label: "Albuquerque, NM", lat: 35.0844, lng: -106.6504, state: "NM" },
  { id: "den", label: "Denver, CO", lat: 39.7392, lng: -104.9903, state: "CO" },
  { id: "phx", label: "Phoenix, AZ", lat: 33.4484, lng: -112.074, state: "AZ" },
] as const;

export function parseCoord(raw: string, min: number, max: number): number | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

export function wellCoverage(state: string): { inScope: boolean; source: string } {
  const source = WELL_STATES[state];
  return source ? { inScope: true, source } : { inScope: false, source: "NETL / NM OCD / CO OGCC" };
}

export function buildMetrics(input: {
  lat: number | null;
  lng: number | null;
  state: string;
}): MetricTile[] {
  const wells = wellCoverage(input.state);
  const coord =
    input.lat != null && input.lng != null
      ? `${input.lat.toFixed(4)}, ${input.lng.toFixed(4)}`
      : "INVALID";

  return [
    {
      id: "coord",
      label: "Pin",
      value: coord,
      source: "Operator",
      status: input.lat != null && input.lng != null ? "operator" : "unknown",
      note: "Entered here. Not reverse-geocoded.",
    },
    {
      id: "jurisdiction",
      label: "State",
      value: input.state || "—",
      source: "Operator-selected",
      status: "operator",
      note: "Not inferred from lat/lng.",
    },
    {
      id: "flood",
      label: "Flood",
      value: "NOT QUERIED",
      source: "FEMA NFHL",
      status: "not_queried",
    },
    {
      id: "elev",
      label: "Elevation",
      value: "NOT QUERIED",
      source: "USGS 3DEP",
      status: "not_queried",
    },
    {
      id: "slope",
      label: "Slope",
      value: "NOT QUERIED",
      source: "USGS 3DEP",
      status: "not_queried",
    },
    {
      id: "trans",
      label: "Transmission",
      value: "NOT QUERIED",
      source: "HIFLD",
      status: "not_queried",
      note: "Voltage UNKNOWN",
    },
    {
      id: "headroom",
      label: "Headroom",
      value: "UNKNOWN",
      source: "No free layer",
      status: "unknown",
      note: "MW is never invented",
    },
    {
      id: "fiber",
      label: "Fiber availability",
      value: "NOT QUERIED",
      source: "FCC BDC",
      status: "not_queried",
      note: "Owners UNKNOWN",
    },
    {
      id: "wells",
      label: "Wells",
      value: wells.inScope ? `IN FREE SET · ${wells.source}` : "OUT OF FREE SET",
      source: wells.source,
      status: "coverage",
      note: wells.inScope
        ? "Presence layer not queried. WHP UNKNOWN."
        : "Free wells are NM OCD and CO OGCC only.",
    },
    {
      id: "cadastral",
      label: "Cadastral",
      value: "UNKNOWN",
      source: "No nationwide free layer",
      status: "unknown",
    },
    {
      id: "whp",
      label: "WHP",
      value: "UNKNOWN",
      source: "Not in free well set",
      status: "unknown",
    },
  ];
}

export function evaluateHeuristic(input: {
  lat: number | null;
  lng: number | null;
  state: string;
}): HeuristicResult {
  const wells = wellCoverage(input.state);
  const flags: HeuristicFlag[] = [];

  if (input.lat == null || input.lng == null) {
    flags.push({
      id: "pin",
      tone: "block",
      title: "Pin is invalid",
      detail: "Lat must be −90…90 and lng −180…180 before any layer can be aimed.",
    });
  }

  flags.push({
    id: "headroom",
    tone: "block",
    title: "Headroom MW is UNKNOWN",
    detail: "Cannot screen interconnect capacity. HIFLD is geometry only.",
  });
  flags.push({
    id: "voltage",
    tone: "block",
    title: "Line voltage is UNKNOWN",
    detail: "kV is not filled from HIFLD on this desk.",
  });
  flags.push({
    id: "owners",
    tone: "block",
    title: "Fiber route owners are UNKNOWN",
    detail: "FCC BDC is availability, not ownership or laterals.",
  });
  flags.push({
    id: "cadastral",
    tone: "block",
    title: "Nationwide cadastral is UNKNOWN",
    detail: "No parcel, owner, or title screen from the free set.",
  });
  flags.push({
    id: "whp",
    tone: "block",
    title: "WHP is UNKNOWN",
    detail: "Wellhead pressure is not in NETL / NM OCD / CO OGCC walk-aways.",
  });

  if (wells.inScope) {
    flags.push({
      id: "wells",
      tone: "info",
      title: `Wells: ${wells.source} is in the free set`,
      detail: "Presence can be a walk-away once queried. Not queried on this pin.",
    });
  } else {
    flags.push({
      id: "wells",
      tone: "warn",
      title: "Wells: out of free coverage",
      detail: `${input.state || "This state"} is outside NM OCD and CO OGCC. Do not infer a national well clearance.`,
    });
  }

  flags.push({
    id: "free",
    tone: "info",
    title: "FEMA / 3DEP / HIFLD / FCC are walk-away capable",
    detail: "Flood, elev/slope, transmission/subs, and fiber availability stay NOT QUERIED until the live layers run.",
  });

  return {
    verdict: "INCOMPLETE SCREEN",
    summary:
      "Heuristic on layer coverage only — not a site score, forecast, interconnect study, or price.",
    flags,
    freeWalkAways: FREE_LAYERS.length,
    unknownBlocks: UNKNOWN_LEDGER.length,
  };
}

export const DEFAULT_LAYERS: Record<LayerId, boolean> = {
  fema: true,
  elev: true,
  slope: true,
  trans: true,
  sub: true,
  fiber: true,
  wells: true,
};

export function mapboxToken(): string | undefined {
  const raw = import.meta.env.VITE_MAPBOX_TOKEN?.trim();
  return raw ? raw : undefined;
}
