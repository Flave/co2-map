<script>
  export let transform;
  export let width;
  export let height;
  export let children;
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
</style>

<div
  class="layer"
  {width}
  {height}
  style={`transform: translate(${transform.x}px, ${transform.y}px) scale(${transform.k});`}>
  {#each children as { Html, meta, dimensions, magnitude }}
    {#if Html}
      <Html />
    {:else if meta}
      <div
        class="fixed-size"
        style={`transform: translate(${dimensions.x + meta.x}px, ${dimensions.y + meta.y}px) scale(${Math.pow(magnitude, 0.4) / 10});`}>
        {meta.title}
      </div>
    {/if}
  {/each}
</div>
