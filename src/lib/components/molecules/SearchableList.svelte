<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import SearchInput from '$lib/components/atoms/SearchInput.svelte';
    import ListItemButton from '$lib/components/atoms/ListItemButton.svelte';

    let {
        label,
        items,
        loading = false,
        error = '',
        placeholder = 'Search...',
        onSearch,
        onSelect,
        result,
    }: {
        label?: string;
        items: T[];
        loading?: boolean;
        error?: string;
        placeholder?: string;
        onSearch: (q: string) => void;
        onSelect: (item: T) => void;
        result: Snippet<[T]>;
    } = $props();

    let query = $state('');
</script>

<div class="w-full">
    <SearchInput {label} {placeholder} bind:value={query} oninput={() => onSearch(query)} />

    <div class="mt-2">
        {#if loading}
            <p class="text-zinc-500 text-sm">Loading...</p>
        {:else if error}
            <p class="text-red-400 text-sm">{error}</p>
        {:else if items.length === 0}
            <p class="text-zinc-600 text-sm">No results found</p>
        {:else}
            <div class="space-y-2">
                {#each items as item}
                    <ListItemButton onclick={() => onSelect(item)}>
                        {@render result(item)}
                    </ListItemButton>
                {/each}
            </div>
        {/if}
    </div>
</div>
