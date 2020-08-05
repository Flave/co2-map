<script>
  export let transform;
  export let width;
  export let height;

  const marks = Array.from({ length: 2500 });
  const size = 32;
</script>

<style>
  .layer {
    position: absolute;
    top: 0;
    left: 0;
  }
  .circle {
    fill: red;
  }
</style>

<svg class="layer" {width} {height}>
  <g {transform}>
    <g transform={`translate(3500, 70)`}>
      {#each marks as d, i}
        <rect
          class="circle"
          width={size}
          height={size}
          x={(i % 50) * size * 1.5}
          y={Math.floor(i / 50) * size * 1.5} />
      {/each}
    </g>
  </g>
</svg>
