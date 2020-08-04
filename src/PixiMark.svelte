<script>
  import { Sprite } from "pixi.js";
  import texture from "./textures";
  import { onMount, tick } from "svelte";

  export let x;
  export let y;
  export let parent;

  const draw = () => {
    const particle = Sprite.from(texture);
    particle.x = x;
    particle.y = y;
    particle.anchor.set(0.5);
    particle.scale.set(0.001);
    parent.addChild(particle);
    return particle;
  };

  onMount(async () => {
    await tick();
    draw();
  });
</script>
