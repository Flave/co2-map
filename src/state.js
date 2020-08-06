import { writable, derived } from "svelte/store";
import { getTransformFromView } from "Utils";
import { zoomIdentity as d3ZoomIdentity } from "d3-zoom";

export const selection = writable(null);
export const width = writable(window.innerWidth);
export const height = writable(window.innerHeight);

export const transform = writable(d3ZoomIdentity.scale(0.1));
export const currentTransform = writable(d3ZoomIdentity.scale(0.1));

// export const view = writable([0, 0, 100]);
// export const transform = derived(
//   [view, width, height],
//   ([$view, $width, $height]) => getTransformFromView($view, $width, $height)
// );

// export const currentView = writable([0, 0, 100]);
// export const currentTransform = derived(
//   [currentView, width, height],
//   ([$currentView, $width, $height]) =>
//     getTransformFromView($currentView, $width, $height)
// );
// export const dimensions = readable(
//   {
//     width: window.innerWidth,
//     height: window.innerHeight,
//   },
//   function start(set) {
//     window.addEventListener('resize')
//     const interval = setInterval(() => {
//       set(new Date());
//     }, 1000);

//     return function stop() {
//       clearInterval(interval);
//     };
//   }
// );

// window.addEventListener("popstate", (e) => {
//   console.log(e);
//   const urlState = urlToState();
// });
