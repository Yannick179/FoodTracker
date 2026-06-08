<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    let {
        value = $bindable(),
        min = 1,
        max = 10000,
        ...rest
    }: HTMLInputAttributes = $props();
</script>

<input
    class="input"
    type="number"
    inputmode="numeric"
    {min}
    {max}
    bind:value
    {...rest}
/>