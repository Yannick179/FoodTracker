<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    let {
        value = $bindable(),
        max = 10000,
        onInput,
        ...rest
    }: {
        value: number;
        max: number;
        onInput: () => void;
    } & HTMLInputAttributes = $props();

    // can be 0 because ui validates possible enter elsewhere, but being able to enter nothing or 0 is more ui friendly
    let minUiEnterConstraint = 0;

    function clamp() {
        if (value > max) value = max;
    }
</script>

<input
    class="input"
    type="number"
    inputmode="numeric"
    min={minUiEnterConstraint}
    max={max}
    bind:value
    oninput={() => {
        clamp();
        onInput();
    }}
    {...rest}
/>