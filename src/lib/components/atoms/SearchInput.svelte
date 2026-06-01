<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { X } from 'lucide-svelte';
    import { Search } from 'lucide-svelte';


    let {
        label,
        value = $bindable(''),
        placeholder = 'Search...',
        ...rest
    }: {
        label?: string;
        value?: string;
        placeholder?: string;
    } & HTMLInputAttributes = $props();
</script>

<div class="search">
    <input
            type="text"
            bind:value
            class="search-input"
            {placeholder}
            {...rest}
    />
    <button
            class="search-cancel-button"
            class:is-hidden={value.length === 0}
            onclick={() => (value = '')}
            type="button"
            aria-label="Clear search"
            tabindex={value.length === 0 ? -1 : 0}
    >
        <X size="1.25em"/>
    </button>

    <span class="search-separator" class:is-hidden={value.length === 0} aria-hidden="true"></span>

    <button class="search-find-results-button">
        <Search size="1.25em"/>
    </button>
</div>
