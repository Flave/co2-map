<script>
  import {
    Application,
    ParticleContainer,
    Sprite,
    Graphics,
    Texture
  } from "pixi.js";
  import { beforeUpdate, afterUpdate, onMount, tick } from "svelte";
  import PixiMark from "./PixiMark";

  export let transform;
  export let width;
  export let height;
  const dpRatio = devicePixelRatio;
  $: cWidth = width * dpRatio;
  $: cHeight = height * dpRatio;

  let app;

  const graphics = new Graphics();
  graphics.beginFill(0x000000, 1);
  graphics.drawCircle(0, 0, 200);
  graphics.endFill();
  let particleTexture;

  const particleContainer = new ParticleContainer(10000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true
  });

  let canvasRef;

  const marks = Array.from({ length: 10000 }).map(() => [
    Math.random(),
    Math.random()
  ]);

  const render = () => {
    app.stage.setTransform(transform.x, transform.y, transform.k, transform.k);
    app.render();
  };

  onMount(async () => {
    await tick();
    app = new Application({
      view: canvasRef,
      width,
      height,
      transparent: true,
      antialias: false,
      autoDensity: true,
      resolution: dpRatio,
      resizeTo: window
    });
    app.stop();
    app.stage.addChild(particleContainer);
    render();

    return app.destroy;
  });

  beforeUpdate(() => {
    if (!app) return;
    render();
  });
</script>

<style>
  .layer {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<canvas class="layer" bind:this={canvasRef}>
  {#each marks as mark}
    <PixiMark
      x={mark[0] * cWidth}
      y={mark[1] * cHeight}
      parent={particleContainer} />
  {/each}
</canvas>
