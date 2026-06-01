<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';

    let {
        children,
        ...rest
    }: {
        children: Snippet;
    } & HTMLButtonAttributes = $props();

</script>

<button class="secondary-button" {...rest}>{@render children()}</button>
