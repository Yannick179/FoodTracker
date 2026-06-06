<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    let {
        value = $bindable(''),
        min = 1,
        max = 10000,
        oninput,
        onbeforeinput,
        ...rest
    }: HTMLInputAttributes = $props();

    function handleBeforeInput(e: InputEvent & { currentTarget: HTMLInputElement }) {
        // block inserting anything that isn't 0-9 (typing or paste).
        // e.data is null for deletions/arrow keys, so those still work.
        if (e.data != null && /\D/.test(e.data)) {
            e.preventDefault();
        }
        onbeforeinput?.(e);
    }

    function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
        // strip any non-digits that slipped past beforeinput (some paste/IME cases)
        let digits = e.currentTarget.value.replace(/\D/g, '');

        // cap at `max` so the value can't exceed it
        const maxNum = Number(max);
        if (digits !== '' && !Number.isNaN(maxNum) && Number(digits) > maxNum) {
            digits = String(maxNum);
        }

        if (digits !== e.currentTarget.value) e.currentTarget.value = digits;
        value = digits;
        oninput?.(e);
    }
</script>

<input
    class="input"
    inputmode="numeric"
    {min}
    {max}
    {...rest}
    bind:value
    onbeforeinput={handleBeforeInput}
    oninput={handleInput}
/>