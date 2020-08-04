<script>
  import PixiMark from "../../PixiMark";
  import { dimensions } from "./index";
  export let parent;

  const { x, y } = dimensions;

  const marks = Array.from({ length: 10000 }).map((d, i) => ({
    x: (i % 50) * 10,
    y: Math.floor(i / 50) * 10
  }));
</script>

{#each marks as mark}
  <PixiMark {...mark} {parent} />
{/each}
