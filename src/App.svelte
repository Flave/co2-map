<script>
  import { onMount, tick } from "svelte";
  import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";
  import { select as d3Select, event as d3Event } from "d3-selection";
  import CanvasLayer from "./PixiLayer";
  import SvgLayer from "./SvgLayer";
  import HtmlLayer from "./HtmlLayer";
  import clusters from "./clusters";

  let zoomable;
  let transform = d3ZoomIdentity;
  let width = 800;
  let height = 800;

  onMount(async () => {
    d3Select(zoomable).call(
      d3Zoom()
        .scaleExtent([0.0001, 10])
        .on("zoom", () => {
          transform = d3Event.transform;
        })
    );
  });
</script>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

<div
  class="container"
  bind:this={zoomable}
  bind:clientWidth={width}
  bind:clientHeight={height}>
  <CanvasLayer {transform} {width} {height} children={clusters} />
  <SvgLayer {width} {height} {transform} />
  <HtmlLayer {width} {height} {transform} children={clusters} />
</div>
