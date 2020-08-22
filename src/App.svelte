<script>
  import { onMount, afterUpdate, tick } from "svelte";
  import {
    parseQuery,
    stringifyQuery,
    getViewFromTransform,
    getTransformFromView
  } from "Utils";
  import { tweened } from "svelte/motion";
  import ZoomCanvas from "./ZoomCanvas";
  import Router from "./Router";
  import {
    initialized,
    selection,
    targetTransform,
    transform,
    width,
    height,
    canvasItems,
    selectedItem,
    reference,
    referenceItem
  } from "./state";
  import CanvasLayer from "./PixiLayer";
  import SvgLayer from "./SvgLayer";
  import HtmlLayer from "./HtmlLayer";
  import clusters from "./clusters";

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

  const handleClick = view => {
    $targetTransform = getTransformFromView(view, $width, $height, true);
  };

  // Reactively upate url when any relevant state changes
  $: queryParams = (() => {
    if (!$targetTransform) return;
    const view = getViewFromTransform($targetTransform, $width, $height);
    return { view, reference: $reference };
  })();

  $: (() => {
    if (!$selectedItem) return;
    $targetTransform = getTransformFromView(
      [$selectedItem.canvasX, $selectedItem.canvasY, 100],
      $width,
      $height
    );
  })();

  const handleUrlChange = ({ detail }) => {
    $reference = detail.reference;
    $targetTransform = getTransformFromView(
      detail.view,
      $width,
      $height,
      false
    );
  };

  const handleUrlLoad = ({ detail }) => {
    $reference = detail.reference || $reference;
    $targetTransform =
      getTransformFromView(detail.view, $width, $height) || $targetTransform;
    $initialized = true;
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

  .reference-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reference {
    border: 1px dotted red;
    pointer-events: all;
  }
</style>

<Router on:load={handleUrlLoad} on:change={handleUrlChange} {queryParams}>
  <ZoomCanvas
    targetTransform={$targetTransform}
    width={window.innerWidth}
    height={window.innerHeight}
    on:zoom={event => ($transform = event.detail)}
    on:zoomEnd={event => ($targetTransform = event.detail)}>
    <CanvasLayer
      transform={$transform}
      with={$width}
      height={$height}
      children={clusters} />
    <!-- <SvgLayer {width} {height} {transform} /> -->
    <HtmlLayer
      transform={$transform}
      with={$width}
      height={$height}
      children={clusters} />
  </ZoomCanvas>

  {#if $referenceItem}
    <div class="reference-wrapper">
      <div
        on:click={() => ($reference = null)}
        class="reference"
        style={`width: ${$referenceItem.size * $transform.k}px; height: ${$referenceItem.size * $transform.k}px;`} />
    </div>
  {/if}

  <div class="btns">
    {#each levels as level}
      <button class="btn" on:click={() => handleClick(level.view)}>
        {level.label}
      </button>
    {/each}
  </div>
</Router>
