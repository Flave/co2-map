<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { parseQuery, stringifyQuery, getViewFromTransform } from "Utils";
  export let queryParams;

  const dispatch = createEventDispatcher();

  // Reactively upate url when any relevant state changes
  $: (() => {
    if (!queryParams) return;
    const filteredParams = Object.entries(queryParams).reduce(
      (params, [key, value]) => {
        if (value) params[key] = value;
        return params;
      },
      {}
    );
    const queryString = `?${stringifyQuery(filteredParams)}`;

    if (queryString !== location.search) {
      history.pushState(null, "", queryString);
    }
  })();

  onMount(() => {
    // Parse state from url
    dispatch("load", parseQuery(location.search));

    window.addEventListener("popstate", e => {
      dispatch("change", parseQuery(location.search));
    });
  });
</script>

<slot />
