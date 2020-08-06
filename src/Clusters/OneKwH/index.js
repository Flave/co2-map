import Html from "./Html";

export const data = [
  { id: "1kwh-coal", label: "Coal – PC", x: 0, y: 0, value: 820 },
  { id: "1kwh-gas", label: "Gas – combined cycle", x: 100, y: 50, value: 490 },
  { id: "1kwh-biomass", label: "Biomass – Dedicated", x: 70, y: 4, value: 230 },
  {
    id: "1kwh-solar-1",
    label: "Solar PV – Utility scale",
    x: 10,
    y: 0,
    value: 48,
  },
  { id: "1kwh-solar-2", label: "Solar PV – rooftop", x: 20, y: 0, value: 41 },
  { id: "1kwh-geothermal", label: "Geothermal", x: 30, y: 0, value: 38 },
  {
    id: "1kwh-solar-3",
    label: "Concentrated solar power",
    x: 40,
    y: 20,
    value: 27,
  },
  { id: "1kwh-hydropower", label: "Hydropower", x: 40, y: 0, value: 24 },
  { id: "1kwh-wind-offshore", label: "Wind Offshore", x: 50, y: 0, value: 12 },
  { id: "1kwh-nuclear", label: "Nuclear", x: 100, y: 0, value: 12 },
  { id: "1kwh-wind-onshore", label: "Wind Onshore", x: 110, y: 0, value: 11 },
  {
    id: "1kwh-ocean",
    label: "Ocean (Tidal and wave)",
    x: 120,
    y: 0,
    value: 17,
  },
];

export default {
  id: "1kwh",
  data,
  Html,
  x: 20,
  y: 20,
};
