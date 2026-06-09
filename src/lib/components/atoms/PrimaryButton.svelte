<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';

    let {
        children,
        disabled = false,
        ...rest
    }: {
        children: Snippet;
    } & HTMLButtonAttributes = $props();

</script>

<button class="primary-button" disabled={disabled} {...rest}>{@render children()}</button>
