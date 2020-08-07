<script>
  import { onMount, afterUpdate, tick } from "svelte";
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
  import ZoomCanvas from "./ZoomCanvas";
  import {
    selection,
    transform,
    currentTransform,
    width,
    height
  } from "./state";

  const levels = [
    {
      label: "Grams",
      view: [10, 10, 50]
    },
    {
      label: "Kilograms",
      view: [170, 170, 400]
    },
    {
      label: "Tons",
      view: [300, 300, 5000]
    },
    {
      label: "Kilotons",
      view: [5000, 5000, 150000]
    },
    {
      label: "Megatons",
      view: [50000, 50000, 5000000]
    },
    {
      label: "Gigatons",
      view: [1500000, 1500000, 100000000]
    }
  ];

  const urlToState = () => {
    const urlState = parseQuery(location.search);
    const transform = getTransformFromView(urlState.view, $width, $height);
    return {
      transform
    };
  };

  // $: (() => {
  //   const view = getViewFromTransform($transform, $width, $height);
  //   console.log(view);
  //   history.pushState(null, "", `?${stringifyQuery({ view })}`);
  // })();

  onMount(() => {
    const urlState = urlToState();
    //$currentTransform = urlState.transform;
    $transform = urlState.transform;

    window.addEventListener("popstate", e => {
      //console.log(e);
      const urlState = urlToState();
    });
  });

  const handleClick = view => {
    $transform = getTransformFromView(view, $width, $height);
  };
</script>

<style>
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

<ZoomCanvas />
<div class="btns">
  {#each levels as level}
    <button class="btn" on:click={() => handleClick(level.view)}>
      {level.label}
    </button>
  {/each}
</div>
