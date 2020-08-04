<script>
  import { Sprite } from "pixi.js";
  import texture from "./textures";
  import { onMount, tick } from "svelte";

  export let x;
  export let y;
  export let parent;
  export let size = 1;

  const draw = () => {
    const particle = Sprite.from(texture);
    particle.x = x;
    particle.y = y;
    particle.anchor.set(0.5);
    particle.width = size;
    particle.height = size;
    parent.addChild(particle);
    return particle;
  };

  onMount(async () => {
    await tick();
    draw();
  });
</script>
