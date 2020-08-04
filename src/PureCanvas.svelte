<script>
  import { beforeUpdate, afterUpdate, onMount, tick } from "svelte";
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

  const draw = () => {
    marks.forEach(mark => {
      const x = mark[0] * cWidth;
      const y = mark[1] * cHeight;
      const r = mark[2] * 2 * dpRatio;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x - r, y, r, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const restoreTransform = () => {
    ctx.restore();
  };

  onMount(async () => {
    ctx = canvasRef.getContext("2d");
    applyTransform();
    await tick();
    draw();
    restoreTransform();
  });

  beforeUpdate(() => {
    if (!ctx) return;
    applyTransform();
    draw();
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
  height={cHeight} />
