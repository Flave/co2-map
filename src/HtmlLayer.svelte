<script>
  export let transform;
  export let width;
  export let height;
  export let children;

  const handleClick = () => {
    console.log("clicked");
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
  <svg class="svg" transform={`translate(200, 200)`}>
    <rect on:click={handleClick} width={100} height={100} class="rect" />
  </svg>
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
