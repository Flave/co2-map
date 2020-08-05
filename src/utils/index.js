import { parse, stringify } from "query-string";
import { zoomIdentity as d3ZoomIdentity } from "d3-zoom";

export const parseQuery = (query) =>
  parse(query, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: "comma",
  });

export const stringifyQuery = (obj) => stringify(obj, { arrayFormat: "comma" });

export const getTransformFromView = (view, width, height) => {
  if (!view) return;
  const k = Math.min(width, height) / view[2];
  const x = width / 2 - view[0] * k;
  const y = height / 2 - view[1] * k;
  return d3ZoomIdentity.translate(x, y).scale(k);
};

export const getViewFromTransform = ({ k, x, y }, width, height) => {
  const size = Math.min(width, height) / k;
  const cx = width / 2 / k - x / k;
  const cy = height / 2 / k - y / k;
  return [cx, cy, size].map(Math.round);
};
