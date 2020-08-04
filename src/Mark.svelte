<script>
  import { afterUpdate, beforeUpdate, onMount, tick } from "svelte";
  export let x;
  export let y;
  export let r;
  export let ctx;
  export let transform;

  const draw = () => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x - r, y, r, 0, 2 * Math.PI);
    ctx.fill();
  };

  onMount(() => {
    draw();
  });

  beforeUpdate(() => {
    draw();
  });
</script>
