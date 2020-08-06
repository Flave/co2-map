<script>
  import { onMount } from "svelte";
  import { getViewFromTransform, getTransformFromView } from "Utils";
  import { zoom as d3Zoom, zoomTransform as d3ZoomTransform } from "d3-zoom";
  import { interpolateZoom as d3InterpolateZoom } from "d3-interpolate";
  import { select as d3Select, event as d3Event } from "d3-selection";
  import clusters from "./clusters";
  import CanvasLayer from "./PixiLayer";
  import SvgLayer from "./SvgLayer";
  import HtmlLayer from "./HtmlLayer";

  import { transform, currentTransform, width, height } from "App/state";

  let zoomable;
  let transitioning = false;

  const zoom = d3Zoom()
    .scaleExtent([0.00001, 14])
    .on("zoom", () => {
      $currentTransform = d3Event.transform;
    })
    .on("end", () => {
      // needed because
      if (transitioning) return;
      $transform = d3Event.transform;
    });

  onMount(async () => {
    const selection = d3Select(zoomable);
    selection.call(zoom).call(zoom.transform, $transform);
  });

  $: (() => {
    if (!zoomable) return;
    const nodeTransform = d3ZoomTransform(zoomable);
    if (
      nodeTransform.k === $transform.k &&
      nodeTransform.x === $transform.x &&
      nodeTransform.y === $transform.y
    ) {
      return;
    }
    // needed because otherwise it will keep playing for another couple of frames
    // which messes up the equality check...
    d3Select(zoomable).interrupt();
    const zoomIn = nodeTransform.k < $transform.k;
    let scaleRatio = $transform.k / nodeTransform.k;
    if (!zoomIn) scaleRatio = 1 / scaleRatio;
    const duration = Math.pow(scaleRatio, 0.16) * 400;
    d3Select(zoomable)
      .transition()
      .on("start", () => (transitioning = true))
      .on("end", () => (transitioning = false))
      .duration(duration)
      .call(zoom.transform, $transform);
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
  bind:clientWidth={$width}
  bind:clientHeight={$height}>
  <CanvasLayer
    transform={$currentTransform}
    width={$width}
    height={$height}
    children={clusters} />
  <!-- <SvgLayer {width} {height} {transform} /> -->
  <HtmlLayer
    width={$width}
    height={$height}
    transform={$currentTransform}
    children={clusters} />
</div>
