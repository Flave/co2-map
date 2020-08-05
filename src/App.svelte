<script>
  import { onMount, tick } from "svelte";
  import {
    parseQuery,
    stringifyQuery,
    getViewFromTransform,
    getTransformFromView
  } from "Utils";
  import { tweened } from "svelte/motion";
  import {
    zoom as d3Zoom,
    zoomTransform as d3ZoomTransform,
    zoomIdentity as d3ZoomIdentity
  } from "d3-zoom";
  import { interpolateZoom as d3InterpolateZoom } from "d3-interpolate";
  import { select as d3Select, event as d3Event } from "d3-selection";
  import CanvasLayer from "./PixiLayer";
  import SvgLayer from "./SvgLayer";
  import HtmlLayer from "./HtmlLayer";
  import clusters from "./clusters";

  let zoomable;
  let transform = d3ZoomIdentity.scale(0.1);
  let width = 800;
  let height = 800;
  const levels = [
    {
      label: "Grams",
      view: [10, 10, 50]
    },
    {
      label: "Kilograms",
      view: [70, 70, 400]
    },
    {
      label: "Tons",
      view: [300, 300, 2000]
    },
    {
      label: "Kilotons",
      view: [1500, 1500, 25000]
    },
    {
      label: "Megatons",
      view: [6000, 6000, 100000]
    },
    {
      label: "Gigatons",
      view: [60000, 60000, 1000000]
    }
  ];

  const stateToUrl = () => {
    const view = getViewFromTransform(d3Event.transform, width, height);
    history.pushState(null, "", `?${stringifyQuery({ view })}`);
  };

  const urlToState = () => {
    const urlState = parseQuery(location.search);
    const transform = getTransformFromView(urlState.view, width, height);
    return {
      transform
    };
  };

  const zoom = d3Zoom()
    .scaleExtent([0.001, 10])
    .on("zoom", () => (transform = d3Event.transform))
    .on("end", () => stateToUrl());

  onMount(async () => {
    const urlState = urlToState();
    const selection = d3Select(zoomable);
    selection.call(zoom).call(zoom.transform, urlState.transform || transform);
  });

  const handleClick = view => {
    const transformTo = getTransformFromView(view, width, height);
    const zoomIn = transform.k < transformTo.k;
    let scaleRatio = transformTo.k / transform.k;
    if (!zoomIn) scaleRatio = 1 / scaleRatio;
    const duration = Math.pow(scaleRatio, 0.25) * 300;
    d3Select(zoomable)
      .transition()
      .duration(duration)
      .call(zoom.transform, transformTo);
  };
</script>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .btns {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }

  .btn {
    font-size: 12px;
    background: #444;
    color: #fff;
    border: none;
    border-radius: 100px;
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
<div class="btns">
  {#each levels as level}
    <button class="btn" on:click={() => handleClick(level.view)}>
      {level.label}
    </button>
  {/each}
</div>
