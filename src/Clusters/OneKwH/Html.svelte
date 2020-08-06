<script>
  import { max } from "d3-array";
  import { data } from "./index";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  export let transform;
  const gap = 2;
  const items = data
    .sort((a, b) => a.value - b.value)
    .reduce((items, item) => {
      const size = Math.sqrt(item.value);
      const prev = items[items.length - 1];
      const x = prev ? prev.x + prev.size + gap : 0;
      items.push({ ...item, size, x });
      return items;
    }, []);

  const width = items.reduce((sum, item) => sum + item.size + gap, 0);
  const height = max(items, i => i.size);
</script>

<style>
  .title {
    font-size: 4px;
    width: 20em;
    margin-bottom: 5px;
  }
  .block {
    fill: #000;
  }
  .content {
    position: relative;
  }
  .text {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1px;
    width: 10px;
  }

  .labels {
    position: absolute;
    top: 0;
    left: 0;
  }
  .value {
    font-weight: 600;
  }
</style>

<h3 transition:fade class="title">
  Life-cycle greenhouse gas emissions of energy sources per 1kWh
</h3>
<div class="content">
  <svg {width} {height}>
    {#each items as item}
      <g transform={`translate(${item.x}, 0)`}>
        <rect class="block" width={item.size} height={item.size} />
      </g>
    {/each}
  </svg>
  <div class="labels">
    {#each items as item, i}
      {#if transform.k >= 2}
        <div
          transition:fade
          class="text"
          style={`transform: translate(${item.x}px, ${i % 2 === 0 ? item.size + 2 : -2}px);`}>
          <div class="label">{item.label}</div>
          <div class="value">{item.value}g CO₂</div>
        </div>
      {/if}
    {/each}
  </div>
</div>
