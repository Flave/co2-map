<script>
  import { onMount, tick } from "svelte";
  import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";
  import { select as d3Select, event as d3Event } from "d3-selection";
  import CanvasLayer from "./PixiCanvas";

  let zoomable;
  let transform = d3ZoomIdentity;
  let width = 800;
  let height = 800;

  onMount(async () => {
    d3Select(zoomable).call(
      d3Zoom()
        .scaleExtent([0.001, 1000])
        .on("zoom", () => {
          transform = d3Event.transform;
        })
    );
    // await tick();
    // draw();
  });
</script>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
  }

  .circle {
    fill: red;
  }
</style>

<div
  class="container"
  bind:this={zoomable}
  bind:clientWidth={width}
  bind:clientHeight={height}>
  <CanvasLayer {transform} {width} {height} />
  <svg class="layer" {width} {height}>
    <g {transform}>
      <circle class="circle" r={1} cx={width * 0.61} cy={height * 0.61} />
    </g>
  </svg>
</div>
