import { writable, derived } from "svelte/store";
import { zoomIdentity as d3ZoomIdentity } from "d3-zoom";

export const width = writable(window.innerWidth);
export const height = writable(window.innerHeight);

// Used for target transform
export const targetTransform = writable(null);
export const transform = writable(null);

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
