<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { X } from 'lucide-svelte';
    import { Search } from 'lucide-svelte';


    let {
        value = $bindable(''),
        placeholder = 'Search...',
        oninput,
        ...rest
    }: {
        value?: string;
        placeholder?: string;
        oninput: (q: string) => void;
    } & HTMLInputAttributes = $props();

    function clearSearch() {
        value = '';
        // programmatic value changes don't fire `input`; flush the binding, then re-trigger
        oninput(value)
    }
</script>

<div class="search">
    <input
            type="text"
            bind:value
            class="search-input"
            {placeholder}
            {oninput}
            {...rest}
    />
    <button
            class="search-cancel-button"
            class:is-hidden={value.length === 0}
            onmousedown={(e) => e.preventDefault()}
            onclick={clearSearch}
            type="button"
            aria-label="Clear search"
            tabindex={value.length === 0 ? -1 : 0}
    >
        <X size="1.25em"/>
    </button>

    <span class="search-separator" class:is-hidden={value.length === 0} aria-hidden="true"></span>

    <button class="search-find-results-button" type="button" onmousedown={(e) => e.preventDefault()}>
        <Search size="1.25em"/>
    </button>
</div>
