<script>
  import { data, width, height } from "./index";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  export let transform;
  export let onSelect;
  export let id;
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

<h3 transition:fade class="title" on:click={() => onSelect(id)}>
  Life-cycle greenhouse gas emissions of energy sources per 1kWh
</h3>
<div class="content">
  <svg {width} {height}>
    {#each data as item}
      <g transform={`translate(${item.x}, 0)`}>
        <rect class="block" width={item.size} height={item.size} />
      </g>
    {/each}
  </svg>
  <div class="labels">
    {#each data as item, i}
      {#if transform.k >= 2}
        <div
          transition:fade
          class="text"
          on:click={() => onSelect(item.id)}
          style={`transform: translate(${item.x}px, ${i % 2 === 0 ? item.size + 2 : -2}px);`}>
          <div class="label">{item.label}</div>
          <div class="value">{item.value}g CO₂</div>
        </div>
      {/if}
    {/each}
  </div>
</div>
