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
  <g {transform} />
</svg>
