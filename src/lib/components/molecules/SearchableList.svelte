<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import SearchInput from '$lib/components/atoms/SearchInput.svelte';
    import ListItemButton from '$lib/components/atoms/ListItemButton.svelte';
    import type {Food} from "../../../routes/api/calorie-tracker/foods/+server";


    let {
        // label,
        items,
        // loading = false,
        // error = '',
        placeholder = 'Search...',
        disabled = false,
        onSearch,
        onSelect,
        // result,
    }: {
        // label?: string;
        items: Food[];
        // loading?: boolean;
        // error?: string;
        placeholder?: string;
        disabled?: boolean;
        onSearch: (q: string) => void;
        onSelect: (item: Food) => void;
        // result: Snippet<[T]>;
    } = $props();

    let query = $state('');

    let searchSection: HTMLElement;

    function handleListKeydown(e: KeyboardEvent) {
        if (disabled) return;
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

        const items = Array.from(
            searchSection.querySelectorAll<HTMLButtonElement>('.list-item-button')
        );
        if (items.length === 0) return;

        e.preventDefault();

        const current = items.indexOf(document.activeElement as HTMLButtonElement);
        let next: number;
        if (current === -1) {
            next = e.key === 'ArrowDown' ? 0 : items.length - 1;
        } else {
            const delta = e.key === 'ArrowDown' ? 1 : -1;
            next = (current + delta + items.length) % items.length;
        }

        items[next].focus();
        items[next].scrollIntoView({ block: 'nearest' });
    }
</script>

<div class="search-container" bind:this={searchSection} onkeydown={handleListKeydown} inert={disabled} tabindex="0" role="button">
    <SearchInput {placeholder} bind:value={query} oninput={() => onSearch(query)} />
    {#each items as item}
        <ListItemButton onclick={() => onSelect(item)} protein={item.protein} carbohydrates={item.carbohydrates} fats={item.fat} name={item.name} amount={100} calories={item.calories}/>
    {/each}
</div>
