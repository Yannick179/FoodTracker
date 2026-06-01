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

<button
        type="button"
        class="cursor-pointer w-full text-left rounded-2xl border-2 border-neutral-400 px-4 py-3
			hover:bg-neutral-800 transition flex justify-between items-center"
        {...rest}
>
    {@render children()}
</button>
