<script>
  import { onMount, afterUpdate, createEventDispatcher } from "svelte";
  import { getViewFromTransform, getTransformFromView } from "Utils";
  import { zoom as d3Zoom, zoomTransform as d3ZoomTransform } from "d3-zoom";
  import { interpolateZoom as d3InterpolateZoom } from "d3-interpolate";
  import { select as d3Select, event as d3Event } from "d3-selection";

  //import { targetTransform, transform, width, height } from "App/state";

  export let targetTransform;
  export let width;
  export let height;

  const dispatch = createEventDispatcher();

  let lastTransform = targetTransform;

  let zoomable;

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
    d3Select(zoomable)
      .call(zoomBehavior)
      .call(zoomBehavior.transform, targetTransform);
  });

  afterUpdate(() => {
    if (!isSameTransform(targetTransform, lastTransform))
      lastTransform = targetTransform;
  });

  // Reactively update zoom transform if a new transform was set from outside
  $: (() => {
    if (!zoomable || !targetTransform) return;
    // Prevent update on every transition step
    if (isSameTransform(targetTransform, lastTransform)) return;
    const nodeTransform = d3ZoomTransform(zoomable);
    // prevent infinite loop
    if (isSameTransform(targetTransform, nodeTransform)) return;
    // Interrupt current transition if there's already a new one coming...apparently has to be called manually
    d3Select(zoomable).interrupt();
    if (targetTransform.transition) {
      const zoomIn = nodeTransform.k < targetTransform.k;
      let scaleRatio = targetTransform.k / nodeTransform.k;
      if (!zoomIn) scaleRatio = 1 / scaleRatio;
      const duration = Math.pow(scaleRatio, 0.16) * 400;
      d3Select(zoomable)
        .transition()
        .duration(1000)
        .call(zoomBehavior.transform, targetTransform);
    } else {
      d3Select(zoomable).call(zoomBehavior.transform, targetTransform);
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
  bind:this={zoomable}
  bind:clientWidth={width}
  bind:clientHeight={height}>
  <slot />
</div>
