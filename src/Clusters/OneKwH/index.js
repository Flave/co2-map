import Html from "./Html";

export const data = [
  { label: "Coal – PC", x: 0, y: 0, value: 820 },
  { label: "Gas – combined cycle", x: 100, y: 50, value: 490 },
  { label: "Biomass – Dedicated", x: 70, y: 4, value: 230 },
  { label: "Solar PV – Utility scale", x: 10, y: 0, value: 48 },
  { label: "Solar PV – rooftop", x: 20, y: 0, value: 41 },
  { label: "Geothermal", x: 30, y: 0, value: 38 },
  { label: "Concentrated solar power", x: 40, y: 20, value: 27 },
  { label: "Hydropower", x: 40, y: 0, value: 24 },
  { label: "Wind Offshore", x: 50, y: 0, value: 12 },
  { label: "Nuclear", x: 100, y: 0, value: 12 },
  { label: "Wind Onshore", x: 110, y: 0, value: 11 },
  { label: "Ocean (Tidal and wave)", x: 120, y: 0, value: 17 },
];

export default {
  id: "1kwh",
  Html,
  x: 20,
  y: 20,
};
