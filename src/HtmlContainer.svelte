<script>
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";
  import { canvasItems } from "App/state";
  export let x;
  export let y;
  export let id;
  export let transform;
  let rootRef;

  let width = 0;
  let height = 0;

  onMount(() => {
    width = rootRef.clientWidth;
    height = rootRef.clientHeight;
    canvasItems.addItems([{ id, width, height }]);
  });

  //$: console.log(width, height);
</script>

<style>
  .root {
    position: absolute;
    top: 0;
    left: 0;
  }
  .fallback {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
  }
</style>

<!--<div
  bind:this={rootRef}
  class="root"
  style={`transform: translate(${x}px, ${y}px);`}>
  {#if transform.k >= 0.5}
    <slot />
  {:else}
    <div
      transition:fade
      class="fallback"
      style={`width: ${width}px; height: ${height}px;`} />
  {/if}
</div> -->

<div
  bind:this={rootRef}
  class="root"
  style={`transform: translate(${x}px, ${y}px);`}>
  <slot />
</div>
