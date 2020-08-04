<script>
  import {
    Application,
    ParticleContainer,
    Sprite,
    Graphics,
    Texture
  } from "pixi.js";
  import { beforeUpdate, afterUpdate, onMount, tick } from "svelte";
  //import mark from "public/images/mark.png";
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

  const particleContainer = new ParticleContainer(1000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true
  });

  const getParticleTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const r = x;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    const texture = Texture.from(canvas);
    return texture;
  };

  const initParticles = () => {
    particleTexture = getParticleTexture(); // app.renderer.generateTexture(graphics);
    const particles = Array.from({ length: 1000 }).map(() => {
      const particle = Sprite.from(particleTexture);
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.anchor.set(0.5);
      particle.scale.set(1);
      app.stage.addChild(particle);
      return particle;
    });
  };

  let canvasRef;

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
    const g = new Graphics();
    g.beginFill(0x0000ff);
    g.drawRect(100, 100, 200, 200);
    g.endFill();
    app.stage.addChild(g);
    app.stage.addChild(particleContainer);
    initParticles();
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

<canvas class="layer" bind:this={canvasRef} />
