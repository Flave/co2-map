import { writable, derived } from "svelte/store";
import { zoomIdentity as d3ZoomIdentity } from "d3-zoom";

// export const defaultState = {
//   transform: d3ZoomIdentity,
//   targetTransform: d3ZoomIdentity,
// };

export const width = writable(window.innerWidth);
export const height = writable(window.innerHeight);

export const initialized = writable(false);

// Used for target transform
export const transform = writable(d3ZoomIdentity);
export const currentTransform = writable(d3ZoomIdentity);

export const canvasItems = (() => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    addItems: (newItems) => update((items) => [...items, ...newItems]),
  };
})();

export const selection = writable(null);
export const selectedItem = derived(
  [canvasItems, selection],
  ([$canvasItems, $selection]) => {
    return $canvasItems.find((item) => item.id === $selection);
  }
);

export const reference = writable(null);
export const referenceItem = derived(
  [canvasItems, reference],
  ([$canvasItems, $reference]) => {
    return $canvasItems.find((item) => item.id === $reference);
  }
);
