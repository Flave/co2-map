<script>
  import { onMount, afterUpdate, createEventDispatcher } from "svelte";
  import { getViewFromTransform, getTransformFromView } from "Utils";
  import { zoom as d3Zoom, zoomTransform as d3ZoomTransform } from "d3-zoom";
  import { interpolateZoom as d3InterpolateZoom } from "d3-interpolate";
  import { select as d3Select, event as d3Event } from "d3-selection";

  export let transform;
  export let width;
  export let height;

  const dispatch = createEventDispatcher();

  let lastTransform = transform;

  let zoomElement;

  const isSameTransform = (t1, t2) =>
    t1.x === t2.x && t1.y === t2.y && t1.k === t2.k;

  const zoomBehavior = d3Zoom()
    .scaleExtent([0.00001, 40])
    .on("zoom", () => {
      dispatch("zoom", d3Event.transform);
    })
    .on("end", () => {
      // needed because
      dispatch("zoomEnd", d3Event.transform);
    });

  onMount(async () => {
    d3Select(zoomElement)
      .call(zoomBehavior)
      .call(zoomBehavior.transform, transform);
  });

  afterUpdate(() => {
    if (!isSameTransform(transform, lastTransform)) lastTransform = transform;
  });

  // Reactively update zoom transform if a new transform was set from outside
  $: (() => {
    if (!zoomElement || !transform) return;
    // Prevent update on every transition step
    if (isSameTransform(transform, lastTransform)) return;
    const nodeTransform = d3ZoomTransform(zoomElement);
    // prevent infinite loop
    if (isSameTransform(transform, nodeTransform)) return;
    // Interrupt current transition if there's already a new one coming...apparently has to be called manually
    d3Select(zoomElement).interrupt();
    if (transform.transition) {
      const zoomIn = nodeTransform.k < transform.k;
      let scaleRatio = transform.k / nodeTransform.k;
      if (!zoomIn) scaleRatio = 1 / scaleRatio;
      const duration = Math.pow(scaleRatio, 0.16) * 400;
      d3Select(zoomElement)
        .transition()
        .duration(1000)
        .call(zoomBehavior.transform, transform);
    } else {
      d3Select(zoomElement).call(zoomBehavior.transform, transform);
    }
  })();
</script>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<div
  class="container"
  bind:this={zoomElement}
  bind:clientWidth={width}
  bind:clientHeight={height}>
  <slot />
</div>
