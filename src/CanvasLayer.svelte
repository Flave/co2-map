<script>
  import { beforeUpdate, afterUpdate, onMount, tick } from "svelte";
  import Mark from "./Mark";
  export let transform;
  export let width;
  export let height;
  const dpRatio = devicePixelRatio;
  $: cWidth = width * dpRatio;
  $: cHeight = height * dpRatio;

  const marks = Array.from({ length: 1000 }).map(() => [
    Math.random(),
    Math.random(),
    Math.random()
  ]);

  let canvasRef;
  let ctx;

  const applyTransform = () => {
    ctx.save();
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.translate(transform.x * dpRatio, transform.y * dpRatio);
    ctx.scale(transform.k, transform.k);
  };

  const restoreTransform = () => {
    ctx.restore();
  };

  onMount(async () => {
    ctx = canvasRef.getContext("2d");
    applyTransform();
    await tick();
    restoreTransform();
  });

  beforeUpdate(() => {
    if (!ctx) return;
    applyTransform();
  });

  afterUpdate(() => {
    restoreTransform();
  });
</script>

<style>
  .layer {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<canvas
  class="layer"
  bind:this={canvasRef}
  style={`width: ${width}px; height: ${height}px;`}
  width={cWidth}
  height={cHeight}>
  {#each marks as mark}
    <Mark
      x={cWidth * mark[0]}
      y={cHeight * mark[1]}
      r={mark[2] * 2 * dpRatio}
      {ctx}
      {transform} />
  {/each}
</canvas>
