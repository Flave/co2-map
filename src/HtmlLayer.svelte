<script>
  import HtmlContainer from "./HtmlContainer";
  import { selection } from "App/state";
  export let transform;
  export let width;
  export let height;
  export let children;

  const handleSelect = id => {
    selection.set(id);
  };
</script>

<style>
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: top left;
  }

  .fixed-size {
    transform-origin: top left;
  }

  .svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .rect {
    fill: red;
  }
</style>

<div
  class="layer"
  {width}
  {height}
  style={`transform: translate(${transform.x}px, ${transform.y}px) scale(${transform.k});`}>
  {#each children as { Html, id, meta, x, y, magnitude }}
    {#if Html}
      <HtmlContainer {transform} {x} {y}>
        <Html {transform} onSelect={handleSelect} />
      </HtmlContainer>
    {:else if meta}
      <div
        class="fixed-size"
        style={`transform: translate(${x + meta.x}px, ${y + meta.y}px) scale(${Math.pow(magnitude, 0.4) / 10});`}>
        {meta.title}
      </div>
    {/if}
  {/each}
</div>
