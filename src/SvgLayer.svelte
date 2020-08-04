<script>
  export let transform;
  export let width;
  export let height;
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
    <circle class="circle" r={1} cx={width * 0.61} cy={height * 0.61} />
  </g>
</svg>
